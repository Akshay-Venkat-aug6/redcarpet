import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute/PrivateRoute';

// Pages
import Register from '../pages/RegisterPage';
import Login from '../pages/LoginPage';
import CustomerHome from '../pages/Home';
import AgentHome from '../pages/AgentHome';
import LoanDetails from '../pages/LoanDetails';
import LoanPage from '../pages/AgentLoanPage';
import CustomerLoanPage from '../pages/CustomerLoanPage';
import AdminLogin from '../pages/AdminLoginPage';
import AdminHome from '../pages/Adminhome';

const Router = () => {
  
  return(
    <Switch>
      <Route exact path="/" component={() => <Redirect to='/login'  />}/>
      {/* Admin Login Page */}
      <Route exact path="/admin/login" component = {AdminLogin} />
      {/* Register */}
      <Route exact path="/register" component={Register}/>
      {/* Login */}
      <Route exact path="/login" component = { Login }/>
      {/* Customer Home */}
      <PrivateRoute exact path="/customer/" component={CustomerHome} />
      {/* Agent Home */}
      <PrivateRoute exact path="/agent/" component = { AgentHome } />
      {/* Loan Details */}
      <PrivateRoute exact path="/agent/loandetails/:customerid" component = { LoanDetails } />
      {/* Loan Page */}
      <PrivateRoute exact path="/agent/loan" component={ LoanPage } />
      {/* Customer Loan Page */}
      <PrivateRoute exact path="/customer/loan" component={ CustomerLoanPage } />
      {/* Admin Home */}
      <PrivateRoute exact path="/admin/home" component={ AdminHome } />
    </Switch>
  )
};

export default Router;