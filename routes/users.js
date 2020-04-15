const router = require('express').Router();
let User = require('../models/user.model');

// Actual Route: "localhost:5000/users/"
router.route('/').get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json({"Error": err}))
});


// Actual Route: "localhost:5000/users/add"
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User Added !"))
    .catch(err => res.status(400).json("Error: " + err));
})



// Single User || Actual Route: "localhost:5000/users/:id"
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) =>{
      console.log(err)
      res.status(400).json({
        "Error": err,
      })}
    );
})

// Update a User || Actual Route: "localhost:5000/users/edit/:id"
router.route('/edit/:id').put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;

      user.save()
        .then(() =>
          res.status(200).json({
            "message": "User Updated !",
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

// Delete a User || Actual Route: "localhost:5000/users/:id"
router.route('/:id').delete((req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() =>
      res.status(200).json({
        "message": "User Deleted !",
      })
    )
    .catch((err) =>
      res.status(400).json({
        "Error": err,
      })
    );
})


module.exports = router;