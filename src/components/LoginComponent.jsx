import React, { useState,useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import TodoList from "./TodoList";
import { TaskContext } from "../App";

function LoginComponent() {
  const navigate = useNavigate();
  const [auth,setAuth] = useContext(TaskContext);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  function ChangeUserName(e) {
    setUserName(e.target.value);
  }

  function changePassword(e) {
    setUserPassword(e.target.value);
  }
  function loginDone(e) {
    e.preventDefault();
    let user = {
      userName: userName,
      userPassword: userPassword,
    };
    console.log("user=>" + JSON.stringify(user));
    if (userName !== "" && userPassword !== "") {
      UserService.loginUser(user).then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          document.getElementById("wrong_email").innerHTML = "";
          localStorage.setItem("token", res.data.obj.token);
          localStorage.setItem("userName", res.data.obj.userName);
          localStorage.setItem("organisation", res.data.obj.organisation);
          // <Route exact path="/TodoList" element={<TodoList />}/>
          setAuth(true);
          navigate("/TodoList")
        } else if (res.data.status === 404 || res.data.status === 401) {
          document.getElementById("wrong_email").innerHTML =
            "Please Enter valid Credentials !";
        }

        document.getElementById("notFilled").innerHTML = "";
      });
    } else {
      document.getElementById("notFilled").innerHTML =
        "Please Enter Details In All Fields !";
    }
  }
  return (
    <div className="container w-50">
      <h2>
        <strong>
          <u>Login</u>
        </strong>
      </h2>
      <form>
        <div className="form-group">
          <label>UserName</label>
          <input
            type="email"
            className="form-control"
            id="emial"
            aria-describedby="emailHelp"
            placeholder="Enter email or UserName"
            onChange={ChangeUserName}
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
