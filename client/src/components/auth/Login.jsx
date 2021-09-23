import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../store/actions/auth.actions.js';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    login(formData);
    setFormData({ email: '', password: '' });
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="email address"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="login-input"
            name="password"
            type="text"
            placeholder="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <p>
          <input type="submit" className="btn btn-primary" value="Login" />
          Not registered? Switch to <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
