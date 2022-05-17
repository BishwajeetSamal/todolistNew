import React,{useEffect} from 'react';
import UserService from '../service/UserService';
import { useNavigate } from "react-router-dom";

function LogoutComponent() {
  const navigate = useNavigate();
    useEffect(() => {
        UserService.userLogout().then((res) => {
          if(res.data.status===200){
            localStorage.clear();
            
          }
          navigate("/LoginComponent");
        });
      }, []);
  return (
    <div></div>
  )
}

export default LogoutComponent