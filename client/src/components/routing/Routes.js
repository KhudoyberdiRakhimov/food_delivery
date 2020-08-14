import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import EditProfile from '../edit/EditProfile';
import UploadProduct from '../edit/UploadProduct';
import RegisterVisitor from '../auth/RegisterVisitor';
import LoginVisitor from '../auth/LoginVisitor';
import VisitorRoute from '../routing/VisitorRoute';
import Home from '../layout/Home';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/loginVisitor' component={LoginVisitor} />
        <Route exact path='/registerVisitor' component={RegisterVisitor} />
        <VisitorRoute exact path='/home' component={Home} />        
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/editProfile' component={EditProfile} />
        <PrivateRoute exact path='/uploadProduct' component={UploadProduct} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;