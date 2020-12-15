import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const Header = (props) => {
  const { handleLoggedUpdate, isLoggedIn } = props;
  const history = useHistory();

  const logoutSubmit = async () => {
    const response = await fetch('http://localhost:8888/logout', {
      credentials: 'include',
      method: 'POST',
    });
    const body = await response.json();
    if (body.success) {
      handleLoggedUpdate(false);
      history.push('/login');
    }
    console.log(body);
  };

  return (
    <div>
      <h1>Reminderizer!</h1>
      {isLoggedIn && (
        <div>
          You&apos;re logged in!
          {' '}
          <Button type="button" onClick={logoutSubmit}>Log out</Button>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  handleLoggedUpdate: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
