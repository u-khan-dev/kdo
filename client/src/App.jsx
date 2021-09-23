import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import { loadUser, logout } from './store/actions/auth.actions';
import setAuthToken from './utils/setAuthToken';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store/store.js';

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('token'))
      setAuthToken(localStorage.getItem('token'));

    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab!
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  });

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
