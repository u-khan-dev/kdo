import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/auth.actions.js';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">::KDO::</Link>
      </h1>
      <h1>
        {!isAuthenticated ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        )}
      </h1>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
