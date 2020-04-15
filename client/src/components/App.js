import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CreateTask from './CreateTask'
import CreateUser from './CreateUser'
import Task from './Task'
import User from './User'
import Tasks from './Tasks'
import Users from './Users'
import UpdateTask from './UpdateTask'
import UpdateUser from './UpdateUser'
import Navbar from './Navbar'
import Home from './Home'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/tasks/new" component={CreateTask} />
          <Route path="/users/new" component={CreateUser} />
          <Route path="/tasks/edit/:id" component={UpdateTask} />
          <Route path="/users/edit/:id" component={UpdateUser} />
          <Route path="/tasks/:id" component={Task} />
          <Route path="/users/:id" component={User} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/users" component={Users} />
          <Route path="/" component={Home} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
