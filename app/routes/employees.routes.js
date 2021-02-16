module.exports = app => {
    const employee = require("../controllers/employees.controller.js");
  
    // Create a new Employee
    app.post("/employee", employee.create);
  
    // Retrieve all Employees
    app.get("/employee", employee.findAll);
  
    // Retrieve a single Employee with employeeId
    app.get("/employee/:employeeId", employee.findOne);
  
    app.get("/employee/id/:employeeId", employee.findOneByEmployeeID);
    // Update a Employee with employeeId
    app.put("/employee/:employeeId", employee.update);
  
    // Delete a Employee with employeeId
    app.delete("/employee/:employeeId", employee.delete);
  
    // Create a new Employee
    app.delete("/employee", employee.deleteAll);
  };