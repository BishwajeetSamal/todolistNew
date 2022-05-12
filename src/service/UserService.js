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
}

export default new UserService();
