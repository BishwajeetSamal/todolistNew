import axios from "axios";

const TODOLIST_API_BASE_URL = "http://localhost:7878/api/v1/alltasks";
class AllTaskService {
  createTask(alltasks) {
    return axios.post(TODOLIST_API_BASE_URL, alltasks, null,{
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  updateLineOnTask(id) {
    return axios.put(TODOLIST_API_BASE_URL + "/" + id, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getAlldataOnload(pageNumber) {
    let pagedata = 4;
    return axios.get(TODOLIST_API_BASE_URL + "/showall/"+pageNumber+"/"+pagedata+"", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }
}

export default new AllTaskService();
