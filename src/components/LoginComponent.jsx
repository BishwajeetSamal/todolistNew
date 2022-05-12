import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function LoginComponent() {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  function ChangeEmailId(e) {
    setEmailId(e.target.value);
  }

  function changePassword(e) {
    setUserPassword(e.target.value);
  }
  function loginDone(e) {
    e.preventDefault();
    let user = {
      emailId: emailId,
      userPassword: userPassword,
    };
    console.log("user=>" + JSON.stringify(user));
    if (emailId !== "" && userPassword !== "") {
      UserService.loginUser(user).then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          document.getElementById("wrong_email").innerHTML = "";
          navigate("/TodoList");
        } else if (res.data.status === 404 || res.data.status === 401) {
          document.getElementById("wrong_email").innerHTML =
            "Please Enter valid Creadentials !";
        }

        document.getElementById("notFilled").innerHTML = "";
      });
    } else {
      document.getElementById("notFilled").innerHTML =
        "Please Enter all fields !";
    }
  }
  return (
    <div className="container">
      <h2>
        <strong>
          <u>Login</u>
        </strong>
      </h2>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="emial"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={ChangeEmailId}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={changePassword}
          />
        </div>
        <div className="p-2">
          <button type="submit" className="btn btn-primary" onClick={loginDone}>
            Submit
          </button>
        </div>
        <div id="notFilled" style={{ color: "red" }}></div>
        <div id="wrong_email" style={{ color: "red" }}></div>
      </form>
    </div>
  );
}

export default LoginComponent;
