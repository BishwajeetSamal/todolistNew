import axios from "axios";

const TODOLIST_API_BASE_URL = "http://localhost:3000/api/v1/alltasks";
class AllTaskService {
  createTask(alltasks) {
    return axios.post(TODOLIST_API_BASE_URL, alltasks);
  }
}

export default new AllTaskService();
