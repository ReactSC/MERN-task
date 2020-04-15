import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


import './App.css'

const UpdateTask = props => {
  const id = props.match.params.id
  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    description: "",
    duration: ""
  });
  useEffect(() => {
    axios.get("http://localhost:5000/tasks/" + id)
      .then(res => setState(res.data))
      .catch(err => console.log(err))
  }, [])

  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:5000/tasks/edit/" + id, state)
      .then((res) => alert(res.data.message))
      .then(
        setState({
          username: "",
          description: "",
          duration: "",
        })
      )
      .catch((err) => console.log(err));
  };

  const onDelete = (id) => {
    axios
      .delete("http://localhost:5000/tasks/" + id)
      .then((res) => alert(res.data.message))
      .catch((err) => console.log(err));

    history.push("/");
  };

  return (
    <div>
      <h1>Create a Task</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={onChangeHandler}
          disabled
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={state.description}
          onChange={onChangeHandler}
          className="text-left"
        />

        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          name="duration"
          id="duration"
          value={state.duration}
          onChange={onChangeHandler}
        />
        <button type="button" onClick={onSubmitHandler}>
          Add Task
        </button>
        <button className="bgRed" onClick={() => onDelete(state._id)}>
          Delete
        </button>
      </form>
    </div>
  );
}
export default UpdateTask
