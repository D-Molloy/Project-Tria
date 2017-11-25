import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Login from "./pages/Login/Login";
import ManagerMain from "./pages/Manager/ManagerMain";
import Create from "./pages/Manager/Create";
import Search from "./pages/Manager/Search";
import CrewMain from "./pages/Crew/CrewMain";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history} component={App}>
        <div>
          <Switch>
          <Route exact path="/" render={(props) => <Login auth={auth} {...props} />} />
          <Route exact path="/manager" render={(props) => <ManagerMain auth={auth} {...props} />} />
          <Route exact path="/manager/create" render={(props) => <Create auth={auth} {...props} />} />
          <Route exact path="/manager/search" render={(props) => <Search auth={auth} {...props} />} />
          <Route exact path="/crew" render={(props) => <CrewMain auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          </Switch>
        </div>
      </Router>
  );
}
