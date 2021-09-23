import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../auth/Login';
import Register from '../auth/Register';
import NotFound from '../layout/NotFound';
import Dashboard from '../dashboard/Dashboard';
import Alert from '../layout/Alert';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
