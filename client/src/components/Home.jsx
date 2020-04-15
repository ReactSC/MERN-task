import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const Home = () => {
  const history = useHistory();
  const [users, setUsers] = useState()
  const [tasks, setTasks] = useState()
  useEffect(() => {
    Axios.get("http://localhost:5000/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

    Axios.get("http://localhost:5000/tasks/")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));

    return () => null;
  }, []);


  const onclickHandler = loc => {
    history.push("/"+loc);
  }

  return (
    <div className="home-wrap">
      <div className="item" onClick={() => onclickHandler("users")}>
        <h2>Users</h2>
        <h1> {users ? users.length : 0} </h1>
      </div>
      <div className="item" onClick={() => onclickHandler("tasks")}>
        <h2>Tasks</h2>
        <h1> {tasks ? tasks.length : 0} </h1>
      </div>
    </div>
  );
}

export default Home
