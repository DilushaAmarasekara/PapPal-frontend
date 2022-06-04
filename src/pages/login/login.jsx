import axios from 'axios';
import { useRef, useState} from 'react';
import { Link } from 'react-router-dom';
// import { Context } from '../../context/Context';
import './login.css';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  // const { user, dispatch, isFetching } = useContext(Context);

  //http://localhost:8000/user/login

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: 'LOGIN_START' });
    setError(false);

    try {
      const res = await axios.post('http://localhost:8000/user/login', {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      // dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      setUserId(res.data.token.sub.id);
      setStatus(res.data.token.sub.status);
      setLoginStatus(res.data.success)
    } catch (err) {
      // dispatch({ type: 'LOGIN_FAILURE' });
      console.log(err);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        {/* disabled={isFetching} */}
        <button className="loginButton" type="submit">
          Login
        </button>
        {loginStatus && (
          <button className="loginButton" type="submit">
          <Link className="linkClass"
            to={`/subscribe/?userId=${userId}?status=${status}`}
          >
            Subscribe Page
          </Link> 
        </button>
      )}
      </form>
     
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          something went wrong !!!
        </span>
      )}
    </div>
  );
}
