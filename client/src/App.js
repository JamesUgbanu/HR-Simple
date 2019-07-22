import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UserTable from './components/UserTable';
import TaskTable from './components/TaskTable';
import Profile from './components/Profile';
import AddTask from './components/AddTask';
import SingleTask from './components/SingleTask';
import Login from './components/Login';
import "./assets/vendor/@fontawesome/css/all.min.css";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/new-user" component={Register} />
        <Route exact path="/new-task" component={AddTask} />
        <Route exact path="/users" component={UserTable} />
        <Route exact path="/tasks" component={TaskTable} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/task" component={SingleTask} />
      </Switch>
    </div>
  </Router>
);

export default App;
