import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPas, setConfirmPas] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    let newObj = { email, password };
    if (toggle) {
      if (confirmPas !== password) {
        return alert("Password doesn't match");
      } else {
        axios.post("https://bronze-wildebeest-belt.cyclic.app/user/signup", newObj).then((res) => {
          alert(res.data.msg);
        });
      }
    } else {
      axios
        .post("https://bronze-wildebeest-belt.cyclic.app/user/login", newObj)
        .then((res) => {
          alert(res.data.msg);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Login Form</h1>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <button
          style={{ backgroundColor: !toggle && "blue" }}
          onClick={() => setToggle(false)}
        >
          Login
        </button>
        <button
          style={{ backgroundColor: toggle && "blue" }}
          onClick={() => setToggle(true)}
        >
          Signup
        </button>
      </div>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          margin: "auto",
        }}
      >
        {!toggle ? (
          <>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value={"Login"} />
            <p>
              Don't have an account?{" "}
              <span onClick={() => setToggle(true)}>Signup</span>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPas(e.target.value)}
              value={confirmPas}
            />
            <input type="submit" value={"Signup"} />
            <p>
              Already have an account?{" "}
              <span onClick={() => setToggle(false)}>Login</span>
            </p>
          </>
        )}
      </form>
    </div>
  );
};
