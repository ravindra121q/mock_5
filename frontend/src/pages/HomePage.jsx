import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [Emp, setEmp] = useState([]);
  const [page, setPage] = useState(1);
  const [setToggle, setSetToggle] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const searchHandler = () => {
    axios
      .get("http://localhost:8080/employees/search", {
        params: { firstName: search },
      })
      .then((res) => {
        if (res.data.employees.length > 0) {
          setEmp(res.data.employees);
          console.log(res.data);
        } else {
          alert("No Employee Found");
        }
        // setEmp(res.data.employees);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/employees?firstName=${search}`)
      .then((res) => {
        setEmp(res.data.employees);
        console.log(res.data);
      });
  }, [setToggle]);
  const deleteHandler = (id) => {
    axios.delete(`http://localhost:8080/employees/${id}`).then((res) => {
      setSetToggle(!setToggle);
      alert(res.data.msg);
    });
  };
  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Employee Management Software</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => navigate("/register")}>Add Employee</button>
        <button>Logout</button>
      </div>
      <div>
        <select name="filter" id="filter">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button onClick={searchHandler}>Search</button>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "auto",
            width: "80%",
            margin: "auto",
            justifyContent: "space-between",
          }}
        >
          <div>No.</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Salary</div>
          <div>Date</div>
          <div>Actions</div>
        </div>
        <div style={{}}>
          {Emp.length > 0 ? (
            Emp.map((item, index) => (
              <div
                style={{
                  display: "flex",

                  width: "80%",
                  margin: "auto",
                  justifyContent: "space-between",
                }}
                key={item.id}
              >
                <div>{index + 1}</div>
                <div>{item.firstName}</div>
                <div>{item.lastName}</div>
                <div>{item.email}</div>
                <div>{item.salary}</div>
                <div>{Date.now()}</div>
                <div>
                  <button>Edit</button>
                  <button onClick={() => deleteHandler(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3 style={{ textAlign: "center" }}>"No Data Found"</h3>
          )}
        </div>
      </div>
    </div>
  );
};
