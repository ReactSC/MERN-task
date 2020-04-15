import React,{useState} from 'react'
import axios from 'axios'

const CreateUser = props => {
  const { history } = props;
  const [state, setState] = useState({
    username: ''
  });

  const onChangeHandler = (e) => {
    setState({
      username: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (state.username) {
      axios.post('http://localhost:5000/users/add', state)
        .then(res => alert(res.data))
        .then(setState({username: ''}))
        .catch(err => console.log(err))
      history.push("/");
    } else alert("Please Fill up all Fields");
  };
console.log(history)
  return (
    <div>
      <h1>Create a User</h1>
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
      </form>
    </div>
  );
};

export default CreateUser
