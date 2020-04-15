const router = require("express").Router();
let Task = require("../models/task.model");

// Actual Route: "localhost:5000/tasks/"
router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) =>{
      console.log(err)
      res.status(400).json({
        "Error": err,
      })}
    );
});

// Actual Route: "localhost:5000/tasks/add"
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  
  const newTask = new Task({
    username,
    description,
    duration,
  });
  
  newTask
    .save()
    .then(() => res.status(201).json({
      "message": "Task Added !"
    }))
    .catch((err) =>{
      console.log(err)
      res.status(400).json({
        "Error": err,
      })}
    );
});

// Single Task || Actual Route: "localhost:5000/tasks/:id"
router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.status(200).json(task))
    .catch((err) =>{
      console.log(err)
      res.status(400).json({
        "Error": err,
      })}
    );
})

// Update a Task || Actual Route: "localhost:5000/tasks/edit/:id"
router.route('/edit/:id').put((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.username = req.body.username;
      task.description = req.body.description;
      task.duration = Number(req.body.duration);

      task.save()
        .then(() =>
          res.status(200).json({
            "message": "Task Updated !",
          })
        )
        .catch((err) =>{
          console.log(err)
          res.status(400).json({
            "Error": err,
          })}
        );
    })
    .catch((err) =>{
      console.log(err)
      res.status(400).json({
        "Error": err,
      })}
    );
})

// Delete a Task || Actual Route: "localhost:5000/tasks/:id"
router.route('/:id').delete((req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(() =>
      res.status(200).json({
        message: "Task Deleted !",
      })
    )
    .catch((err) =>
      res.status(400).json({
        Error: err,
      })
    );
})


module.exports = router;
