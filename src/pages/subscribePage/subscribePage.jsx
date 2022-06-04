import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './subscribePage.css';

export default function SubscribePage() {
  const location = useLocation();
  const userId = location.search.split('?')[1].split('=')[1];
  const status = location.search.split('?')[2].split('=')[1];
  const [error, setError] = useState(false);
  const [value, setValue] = useState(false);
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState(false);

  useEffect(() => {
    if (status === 'Unsubscribed') {
      setValue(false);
    } else {
      setValue(true);
    }
  }, [status]);

  const handleSubmitSubscribe = async (e) => {
    e.preventDefault();
    setValue(true);
    setError(false);
    setComment(true);
    try {
      const res = await axios.put(
        'http://localhost:8000/user/subscribe/' + userId
      );
      console.log(res.data.user.status);
      setMessage(res.data.message);
      if (res.data.user.status === 'Unsubscribed') {
        window.location.replace('https://www.paypal.com/cgi-bin/webscr');
      }
    } catch (err) {
      setError(true);
    }
  };

  const handleSubmitUnSubscribe = async (e) => {
    e.preventDefault();
    setValue(false);
    setError(false);
    setComment(true);
    try {
      const res = await axios.put(
        'http://localhost:8000/user/unsubscribe/' + userId
      );
      console.log(res.data);
      setMessage(res.data.message);
      if (res.data.user.status === 'Subscribed') {
        window.location.replace(
          'https://www.paypal.com/cgi-bin/webscr?cmd=_subscr-find&alias=M9JBDBH5CF26U'
        );
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">
        Please Subscribe For Access This Web Page
      </span>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        className="registerForm"
      >
        {value ? (
          <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_subscr-find&alias=M9JBDBH5CF26U">
            <img
              SRC="https://www.paypalobjects.com/en_US/i/btn/btn_unsubscribe_LG.gif"
              BORDER="0"
              className="unSubscribeButton"
              onClick={handleSubmitUnSubscribe}
            />
          </a>
        ) : (
          <>
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
              type="hidden"
              name="hosted_button_id"
              value="V33BE4HLK4H58"
            />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif"
              border="0"
              name="submit"
              alt="PayPal - The safer, easier way to pay online!"
              className="subscribeButton"
              onClick={handleSubmitSubscribe}
            />
            <img
              alt=""
              border="0"
              src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
              width="10"
              height="10"
            />
          </>
        )}
      </form>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          something went wrong !!!
        </span>
      )}
      {comment && (
        <span style={{ color: 'black', marginTop: '10px' }}>{message}</span>
      )}
    </div>
  );
}
