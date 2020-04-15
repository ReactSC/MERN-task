import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory} from "react-router-dom";

const Tasks = () => {
  const [state, setState] = useState()
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) =>
        setState(res.data)
      )
      .catch((err) => console.log(err));
    return () => state;
  }, []);

    const onEdit = (id) => {
      history.push("/tasks/edit/" + id);
    };

    const onDelete = (id) => {
      axios
        .delete("http://localhost:5000/tasks/" + id)
        .then((res) => alert(res.data.message))
        .catch((err) => console.log(err))

      const newTask = state.filter((task) => task._id !== id);
      setState(newTask);
    };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S/L</th>
            <th>User Name</th>
            <th>Task Description</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        {state &&
          state.map((task, index) => (
            <List
              key={index}
              sl={index + 1}
              name={task.username}
              description={task.description}
              duration={task.duration}
            >
              <button className="bgGreen" onClick={() => onEdit(task._id)}>
                Edit
              </button>
              <button className="bgRed" onClick={() => onDelete(task._id)}>
                Delete
              </button>
            </List>
          ))}
      </table>
    </div>
  );
}

export default Tasks


const List = props => {
  return (
    <tbody>
      <tr>
        <td>{props.sl}</td>
        <td>{props.name}</td>
        <td>{props.description}</td>
        <td>{props.duration}</td>
        <td className="action">{props.children}</td>
      </tr>
    </tbody>
  );
}