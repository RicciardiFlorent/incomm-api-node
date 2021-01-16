const Employee = require("../models/employees.model.js");

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Employee
    const employee = new Employee({
      company_id: req.body.company_id,
      user_id: req.body.user_id,
      role: req.body.role
    });
  
    // Save Employee in the database
    Employee.create(employee, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Employee."
        });
      else res.send(data);
    });
  };

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      else res.send(data);
    });
  };

// Find a single Employee with a employeeId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.employeeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.employeeId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Employee with a employeeId
exports.findOneByName = (req, res) => {
    Employee.findByName(req.params.employeeName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with name ${req.params.employeeName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Employee with name " + req.params.employeeName
          });
        }
      } else res.send(data);
    });
  };


// Update a Employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Employee.updateById(
      req.params.employeeId,
      new Employee(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employee with id ${req.params.employeeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Employee with id " + req.params.employeeId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Employee.remove(req.params.employeeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.employeeId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Employee with id " + req.params.employeeId
          });
        }
      } else res.send({ message: `Employee was deleted successfully!` });
    });
  };
// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
    Employee.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all employees."
        });
      else res.send({ message: `All Employees were deleted successfully!` });
    });
  };