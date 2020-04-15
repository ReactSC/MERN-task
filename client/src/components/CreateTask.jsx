import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CreateTask = props => {
  const { history } = props
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    users: []
  })

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setState({
        ...state,
        users: res.data
      }))
      .catch(err => console.log(err))
    return () => state
  }, [])

  const onChangeHandler = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    const { username, description, duration } = state;
    if (username && description && duration) {
      const task = {
        username,
        description,
        duration,
      };
      axios
        .post("http://localhost:5000/tasks/add", task)
        .then((res) => alert(res.data.message))
        .catch((err) => console.log(err));
      history.push("/");
    } else alert('Please Fill up all Fields')
  }





  return (
    <div>
      <h1>Create a Task</h1>
      <form onSubmit={ onSubmitHandler }>
        <label htmlFor="username">Username:</label>
        <select
          name="username"
          id="username"
          value={state.username}
          onChange={onChangeHandler}
        >
          <option value="" defaultValue >Select an User</option>
          {state.users.map(user => (
            <option key={ user.username } value={ user.username }>
              { user.username }
            </option>
          ))}
        </select>

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={state.description}
          onChange={onChangeHandler}
        />

        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          name="duration"
          id="duration"
          value={state.duration}
          onChange={onChangeHandler}
        />
        <button
          type="button"
          onClick={onSubmitHandler}
        >Add Task</button>
      </form>
    </div>
  );
}

export default CreateTask
