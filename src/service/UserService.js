import axios from "axios";

const TODOLIST_API_BASE_URL = "http://localhost:7878/api/v1";
class UserService {
  createUser(usr) {
    console.log(usr);
    return axios.post(TODOLIST_API_BASE_URL + "/register", usr);
  }

  loginUser(usr) {
    console.log(usr);
    return axios.post(TODOLIST_API_BASE_URL + "/login", usr);
  }

  async userLogout() {
    const config={
      headers:{
        Authorization:localStorage.getItem("token")
    }};
    const res =await axios.post(TODOLIST_API_BASE_URL + "/logout",null,config);
    return res;
  }

  checkEmail(emailId){
    return axios.get(TODOLIST_API_BASE_URL + "/checkEmail/"+emailId);
  }


checkUserName(userName){
  return axios.get(TODOLIST_API_BASE_URL + "/checkUserName/"+userName);
}
}

export default new UserService();
