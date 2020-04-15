import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const UpdateUser = props => {
  const id = props.match.params.id
  const history = useHistory();
  const [state, setState] = useState({
    username: ''
  })
  useEffect(() => {
    axios.get("http://localhost:5000/users/" + id)
      .then(res => setState(res.data))
    return () => state
  }, [])

  const onChangeHandler = (e) => {
    setState({
      username: e.target.value,
    });
  };
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (state.username) {
      axios
        .put("http://localhost:5000/users/edit/"+id, state)
        .then((res) => alert(res.data.message))
        .then(setState({ username: "" }))
        .catch((err) => console.log(err));
    } else alert("Please Fill up The Fields");
  };

    const onDelete = (id) => {
      axios
        .delete("http://localhost:5000/users/" + id)
        .then((res) => alert(res.data.message))
        .catch((err) => console.log(err));

      history.push("/");
    };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={state.username}
          onChange={onChangeHandler}
        />

        <button type="button" onClick={onSubmitHandler}>
          Add User
        </button>
        <button className="bgRed" onClick={() => onDelete(id)}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default UpdateUser
