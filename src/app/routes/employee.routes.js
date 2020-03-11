module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  // Create a new emp
  app.post("/employees/add", employees.create);

  // Retrieve all emps
  app.get("/employees", employees.findAll);

  // Retrieve a single emp
  app.get("/employees/:employeeId", employees.findOne);

  // Update a emp
  app.put("/employees/:empId/edit", employees.update);

  // Delete a emp
  app.delete("/employees/:empId", employees.delete);

  // delete all emp
  app.delete("/employees", employees.deleteAll);
};
