const express = require("express");
const { EmployeeModel } = require("../model/employee.model");
const employeeRouter = express.Router();

employeeRouter.post("/add", async (req, res) => {
  const { firstName, lastName, email, salary, department } = req.body;
  try {
    const employee = new EmployeeModel(req.body);
    console.log(req.body);
    await employee.save();
    res.status(200).json({ msg: "new employee is added", employee: req.body });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

employeeRouter.delete("/:id", async (req, res) => {
  try {
    const employee_exist = await EmployeeModel.findById(req.params.id);
    if (!employee_exist)
      return res.status(404).json({ msg: "employee not found" });
    await EmployeeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "employee is deleted" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

employeeRouter.get("/", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const employees = await EmployeeModel.find().skip(startIndex).limit(limit);
    const totalEmployees = await EmployeeModel.countDocuments();

    const result = {
      totalEmployees: totalEmployees,
      currentPage: page,
      employees: employees,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

employeeRouter.get("/employees/filter", async (req, res) => {
  try {
    const department = req.query.department;

    const employees = await EmployeeModel.find({ department: department });

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

employeeRouter.get("/employees/sort", async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    if (sortBy == "asc") sortBy = 1;
    else if (sortBy == "desc") sortBy = -1;
    const employees = await EmployeeModel.find().sort({ salary: sortBy });

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

employeeRouter.get("/search", async (req, res) => {
  try {
    const firstName = req.query.firstName;

    const employees = await EmployeeModel.find({
      firstName: { $regex: firstName, $options: "i" },
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = { employeeRouter };
