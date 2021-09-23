import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../store/actions/auth.actions.js';
import { setAlert } from '../../store/actions/alert.actions.js';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert('passwords do not match', 'danger');
    } else {
      register({ name, email, password });
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className="register-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="register-input"
            name="name"
            type="text"
            placeholder="name"
            required
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="register-input"
            name="email"
            type="email"
            placeholder="email address"
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="register-input"
            name="password"
            type="text"
            placeholder="password"
            value={password}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="register-input"
            name="confirmPassword"
            type="text"
            placeholder="confirm password"
            required
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <p>
          <input type="submit" className="btn btn-primary" value="Register" />
          Already registered? Switch to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
