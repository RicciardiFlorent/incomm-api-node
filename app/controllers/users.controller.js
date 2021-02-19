const User = require("../models/users.model.js");
var bcrypt = require ('bcrypt');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a User
    bcrypt.hash(req.body.password, 10)
        .then((pass)=>{
            const user = new User({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
                password: pass,
                gender: req.body.gender,
                birthdate: req.body.birthdate
            });
            // Save User in the database
            User.create(user, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                else res.send(data);
            });
        })
        .catch((e)=>{
            res.status(500).send({
                message:
                    e || "Some error occurred while creating the User."
            });
        })
  };

// login user
exports.login = async(req, res) => {
  console.log(req.body)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    await User.checkCredential(req.body.email, req.body.password, (err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error with the credentials"
            });
        else res.send(data);
    });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  };

// Find a single User with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single User with an email
exports.findOneByEmail = (req, res) => {
    User.findByEmail(req.params.userEmail, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with email ${req.params.userEmail}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with email " + req.params.userEmail
          });
        }
      } else res.send(data);
    });
  };


// Update a User identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.updateById(
      req.params.userId,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.userId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      else res.send({ message: `All Users were deleted successfully!` });
    });
  };
