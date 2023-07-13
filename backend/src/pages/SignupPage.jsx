import axios from "axios";
import React, { useState } from "react";

export const SignupPage = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Salary, setSalary] = useState("");
  const [Department, setDepartment] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (!FirstName || !LastName || !Email || !Salary || !Department) {
      return alert("Please fill all the fields");
    }
    const newObj = {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      salary: Salary,
      department: Department,
    };
    axios.post("https://bronze-wildebeest-belt.cyclic.app/employees/add", newObj).then((res) => {
      alert(res.data.msg);
    });
  };
  return (
    <div>
      <h1>Add Employee</h1>
      <form
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
          border: "1px solid black",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          value={FirstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          value={LastName}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
        />
        <input
          type="Number"
          placeholder="Salary"
          onChange={(e) => setSalary(e.target.value)}
          value={Salary}
        />
        <input
          type="text"
          placeholder="Department"
          onChange={(e) => setDepartment(e.target.value)}
          value={Department}
        />
        <button onClick={submitHandler}>Submit</button>
      </form>
    </div>
  );
};
