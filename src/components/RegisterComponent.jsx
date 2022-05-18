import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
function RegisterComponent() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");

  function ChangeFirstName(e) {
    setFirstName(e.target.value);
  }

  function ChangeLastName(e) {
    setLastName(e.target.value);
  }

  function ChangeEmailId(e) {
    setEmailId(e.target.value);
    
  }

  function CheckEmailIsPresent(){
    let emailValid = emailValidation(emailId);
            if(emailValid){
              document.getElementById("emailId").style.borderColor="";
              document.getElementById("wrong_email").innerHTML="";
              document.getElementById("wrong_email").style.display="none";
              
              UserService.checkEmail(emailId).then((resp)=>{  
                if(resp.data.status===409){
                  document.getElementById("emailId").style.borderColor="red";
                  document.getElementById("wrong_email").innerHTML = "Email Already Exist";
                  document.getElementById("wrong_email").style.display="block";
                }
              })
            }else{
              document.getElementById("emailId").style.borderColor="red";
              document.getElementById("wrong_email").innerHTML="Enter valid emailId";
              document.getElementById("wrong_email").style.display="block";
            }
   
  }

  function CheckUserNameIsPresent(){
            if(document.getElementById("userName").value!=null){
              document.getElementById("userName").style.borderColor="";
              document.getElementById("wrong_userName").innerHTML="";
              document.getElementById("wrong_userName").style.display="none";
              
              UserService.checkUserName(userName).then((resp)=>{  
                if(resp.data.status===409){
                  document.getElementById("userName").style.borderColor="red";
                  document.getElementById("wrong_userName").innerHTML = "UserName Already Exist";
                  document.getElementById("wrong_userName").style.display="block";
                }
              })
            }else{
              document.getElementById("userName").style.borderColor="red";
              document.getElementById("wrong_userName").innerHTML="Enter UserName";
              document.getElementById("wrong_userName").style.display="block";
            }
   
  }



   //email validation function
   function emailValidation(email){
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regex.test(email) === false){
        return false;
    }
    return true;
    
}

  function changeUserName(e) {
    setUserName(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }
  function changeOrganisation(e) {
    setOrganisation(e.target.value);
  }
  function changeDOB(e) {
    setDob(e.target.value);
  }
  function changeMobile(e) {
      setContactNo(e.target.value); 
    }
  
//check whether the mobile number is 10 digit or not.
  function checkMoblieNo(){
    if(contactNo.length>10 || contactNo.length<10){
      
      document.getElementById("wrong_ContactNo").innerHTML = "Enter 10 digit mobile number";
        document.getElementById("wrong_ContactNo").style.display = "block";
        document.getElementById("registerBtn").disabled = true;
        
  }else{
    document.getElementById("wrong_ContactNo").style.display = "none";
    document.getElementById("wrong_ContactNo").innerHTML = "";
    document.getElementById("registerBtn").disabled = false;
  }
}

  function registerUser(e) {
    e.preventDefault();
    let user = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      userName: userName,
      userPassword: userPassword,
      organisation: organisation,
      dob: dob,
      contactNo: contactNo,
    };
    console.log("user=>" + JSON.stringify(user));
    if (
      firstName !== "" &&
      lastName !== "" &&
      emailId !== null &&
      userName !== "" &&
      userPassword !== "" &&
      organisation !== "" &&
      dob !== "" &&
      contactNo !== ""
    ) {
      UserService.createUser(user).then((res) => {
        if (res.data.status === 200) {
          document.getElementById("wrong_email").innerHTML = "";
          navigate("/LoginComponent");
        } else if (res.data.status === 409) {
          document.getElementById("wrong_email").innerHTML =
            "User Already Present !";
        } else if (res.data.status === 400) {
          document.getElementById("wrong_email").innerHTML =
            "Please Enter valid email !";
        }

        document.getElementById("notFilled").innerHTML = "";
      });
    } else {
      const chkValid = ["firstName","lastName","emailId","userName","userPassword","organisation","gender","contactNo"];
      chkValid.map((column)=>{
        if(document.getElementById(""+column+"").value ==="" ||document.getElementById(""+column+"").value ===null){
          console.log(column);
          document.getElementById(""+column+"").style.borderColor ="red";
        }else{
          //checking if email is in correct format opr not
          if(column==="emailId"){
            let emailValid = emailValidation(document.getElementById("emailId").value);
            if(emailValid){
              document.getElementById("emailId").style.borderColor="";
              document.getElementById("wrong_email").innerHTML="";
              document.getElementById("wrong_email").style.display="none";
            }else{
              document.getElementById("emailId").style.borderColor="red";
              document.getElementById("wrong_email").innerHTML="Enter valid emailId";
              document.getElementById("wrong_email").style.display="block";
             
              
            }
         
          }else{
            document.getElementById(""+column+"").style.borderColor ="";
          }
          
          
        }
      });
      
      document.getElementById("notFilled").innerHTML =
        "Please Enter Details In All Fields !";
    }

   

  }
  return (
    <div>
      <div className="container w-50">
        <h2>
          <strong>
            <u>Register</u>
          </strong>
        </h2>
        <form>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter First Name"
              onChange={ChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter Last Name"
              onChange={ChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>EmailId </label>
            <input
              type="email"
              className="form-control"
              id="emailId"
              placeholder="Enter EmailId"
              onChange={ChangeEmailId}
              onBlur={CheckEmailIsPresent}
            />
            <div id="wrong_email" style={{ color: "red" ,display:"none"}}></div>
          </div>
          <div className="form-group">
            <label>UserName</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter UserName"
              onChange={changeUserName}
              onBlur={CheckUserNameIsPresent}
            />
             <div id="wrong_userName" style={{ color: "red" ,display:"none"}}></div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              placeholder="Enter Password"
              onChange={changePassword}
            />
          </div>
          <div className="form-group">
            <label>Organization</label>
            <input
              type="text"
              className="form-control"
              id="organisation"
              placeholder="Enter Organization"
              onChange={changeOrganisation}
            />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
              type="date"
              className="form-control"
              id="gender"
              placeholder="Enter DOB"
              onChange={changeDOB}
              min="1900-01-01" max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="number"
              className="form-control"
              id="contactNo"
              placeholder="0000000000"
              onChange={changeMobile}
              onBlur={checkMoblieNo}
              autoComplete="off"
            />
            <div id="wrong_ContactNo" style={{ color: "red" ,display:"none"}}></div>
          </div>
          <div className="p-2 text-center">
            <button
              type="submit"
              className="btn btn-primary w-50 m-2"
              onClick={registerUser}
              id="registerBtn"
            >
              Submit
            </button>
            <div id="notFilled" style={{ color: "red" }}></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
