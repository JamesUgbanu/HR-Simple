import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UserTable from './components/UserTable';
import TaskTable from './components/TaskTable';
import Profile from './components/Profile';
import AddTask from './components/AddTask';
import ShowTask from './components/Task/showTask';
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import "./assets/vendor/@fontawesome/css/all.min.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './App.css';
//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

return (
  <Provider store={store}>
     <Router>
    <div>
      <Alert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/new-user" component={Register} />
        <PrivateRoute exact path="/new-task" component={AddTask} />
        <Route exact path="/users" component={UserTable} />
        <PrivateRoute exact path="/tasks/me" component={TaskTable} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/task/:id" component={ShowTask} />
      </Switch>
    </div>
  </Router>
  </Provider>
);
};

export default App;
