import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Users = props => {
  const [state, setState] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setState(res.data))
      .catch((err) => console.log(err));
    return () => state;
  }, []);

  const history = useHistory();

  const onEdit = (id) => {
    history.push("/users/edit/" + id);
  };

  const onDelete = (id) => {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then((res) => alert(res.data.message))
      .catch((err) => console.log(err));

    const newUser = state.filter(user => user._id !== id)
    setState(newUser)
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S/L</th>
            <th>User Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        {state &&
          state.map((user, index) => (
            <List key={index} sl={index + 1} name={user.username}>
              <button className="bgGreen" onClick={() => onEdit(user._id)}>
                Edit
              </button>
              <button className="bgRed" onClick={() => onDelete(user._id)}>
                Delete
              </button>
            </List>
          ))}
      </table>
    </div>
  );
}

export default Users


const List = props => {
  return (
    <tbody>
      <tr>
        <td>{props.sl}</td>
        <td>{props.name}</td>
        <td className="action">
          {props.children}
        </td>
      </tr>
    </tbody>
  );
};
