const Employee = require("../models/employee.model.js");

// Create and Save a new emp
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a emp
  const employee = new Employee({
    name: req.body.name,
    phone: req.body.phone,
    city: req.body.city,
    address1: req.body.address1,
    address2: req.body.address2,
    postal_code: req.body.postal_code
  });

  // Save in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new emp."
      });
    else res.send(data);
  });
};

// Retrieve all emp
exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving emps."
      });
    else res.send(data);
  });
};

// Find a single emp
exports.findOne = (req, res) => {
  Employee.findById(req.params.empId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Emp with id ${req.params.empId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Emp with id " + req.params.empId
        });
      }
    } else res.send(data);
  });
};

// Update a emp
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Employee.updateById(
    req.params.empId,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Emp with id ${req.params.empId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Emp with id " + req.params.empId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a emp
exports.delete = (req, res) => {
  Employee.remove(req.params.empId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Emp with id ${req.params.empId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete emp with id " + req.params.empId
        });
      }
    } else res.send({ message: `Emp deleted successfully!` });
  });
};

// Delete all 
exports.deleteAll = (req, res) => {
  Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all emps."
      });
    else res.send({ message: `All emps deleted successfully!` });
  });
};
