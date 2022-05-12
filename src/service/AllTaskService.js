import axios from "axios";

const TODOLIST_API_BASE_URL = "http://localhost:3000/api/v1/alltasks";
class AllTaskService {
  createTask(alltasks) {
    return axios.post(TODOLIST_API_BASE_URL, alltasks);
  }

  updateLineOnTask(id) {
    return axios.put(TODOLIST_API_BASE_URL + "/" + id);
  }

  getAlldataOnload() {
    return axios.get(TODOLIST_API_BASE_URL + "/showall");
  }
}

export default new AllTaskService();
