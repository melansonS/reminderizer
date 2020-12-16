import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import API_URL from '../lib/constants';
import AuthForm from '../components/AuthForm';
import ErrorAlert from '../components/ErrorAlert';

const Signup = (props) => {
  const { handleLoggedUpdate, handleUserIdUpdate } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSignupSubmit = async (values) => {
    const { email, password } = values;
    const response = await fetch(`${API_URL}/signup`, {
      credentials: 'include',
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
    const body = await response.json();
    if (body.success) {
      handleLoggedUpdate(true);
      handleUserIdUpdate(body.userId);
      // navigate directly to the Dashboard
      history.push('/dashboard');
    } else {
      setErrorMessage(body.errorMessage);
    }
  };
  return (
    <div className="login-container">
      <h1>Signup</h1>
      <AuthForm formSubmit={handleSignupSubmit} submitValue="Sign up" validatePassword />
      {errorMessage && (<ErrorAlert errorMessage={errorMessage} />)}
      <div className="auth-redirect">
        <p> Already have an account? :</p>
        <Button type="link">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
};

Signup.propTypes = {
  handleLoggedUpdate: PropTypes.func.isRequired,
  handleUserIdUpdate: PropTypes.func.isRequired,
};

export default Signup;
