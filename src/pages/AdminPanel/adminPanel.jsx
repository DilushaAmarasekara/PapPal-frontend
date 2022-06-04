import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './adminPanel.css';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  //http://localhost:8000/user/getAllUsers
  useEffect(() => {
    setError(false);
    const getUsers = async () => {
      const res = await axios.get('http://localhost:8000/user/getAllUsers');
      console.log(res.data.users);
      setUsers(res.data.users);
    };
    getUsers();
  }, []);

  console.log(users);
  return (
    <div className="register">
      <span className="registerTitle">User Details </span>
      <form className="registerForm">
        {users.map((user) => (
          <div key={user._id} className="userDetails">
            <button className="userButton" type="submit">
              {user.name}
            </button>
            <button className="statusButton" type="submit">
              {user.status}
            </button>
          </div>
        ))}
      </form>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          something went wrong !!!
        </span>
      )}
    </div>
  );
}
