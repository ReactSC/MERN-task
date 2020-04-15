import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        background: "#444",
        color: "#fff",
        display: "flex",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <Nav to="/" value="Home" />
        <Nav to="/users" value="All User" />
        <Nav to="/tasks" value="All Task" />
        <Nav to="/users/new" value="Create User" />
        <Nav to="/tasks/new" value="Create Task" />
      </div>
    </div>
  );
}

export default Navbar


const Nav = props => {
    const link = {
    padding: '10px',
    color: '#fff',
    textDecoration: 'none',
    display: 'inline-block'
  }
  const activeLink = {
    background: '#ffc',
    color: '#000',
    fontWeight: 700,
    borderBottom: '2px solid green',
  }
  return (
    <NavLink style={link} activeStyle={activeLink} to={props.to} exact >
    {props.value}
    </NavLink>
  )
}