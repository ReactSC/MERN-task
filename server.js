const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();




// import Routes
const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');


const app = express();
const port = process.env.PORT || 5000;

// Use Some middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Connect MongoDB by mongoose
const uri = process.env.DB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Database is connected')
})


//  Add Routes
app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes)

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to our application.",
  });
});


// Server Listen
app.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`)
})