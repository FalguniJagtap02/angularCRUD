const sql = require("./db.js");

const Employee = function(employee) {
  this.name = employee.name;
  this.phone = employee.phone;
  this.city = employee.city;
  this.address1 = employee.address1;
  this.address2 = employee.address2;
  this.postal_code = employee.postal_code;
};

Employee.create = (newEmp, result) => {
  sql.query("INSERT INTO employee SET ?", newEmp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { id: res.insertId, ...newEmp });
    result(null, { id: res.insertId, ...newEmp });
  });
};

Employee.findById = (empId, result) => {
  sql.query(`SELECT * FROM employee WHERE id = ${empId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found
    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = result => {
  sql.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, emp, result) => {
  sql.query(
    "UPDATE employee SET name = ?, phone = ?, city = ?, address1 = ?, address2 = ?, postal_code = ? WHERE id = ?",
    [emp.name, emp.phone, emp.city, emp.address1, emp.address2, emp.postal_code, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id, ...emp });
      result(null, { id: id, ...emp });
    }
  );
};

Employee.remove = (empId, result) => {
  sql.query("DELETE FROM employee WHERE id = ?", empId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", empId);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employees`);
    result(null, res);
  });
};

module.exports = Employee;