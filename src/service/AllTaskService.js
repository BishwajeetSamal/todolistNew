import axios from "axios";

const TODOLIST_API_BASE_URL = "http://localhost:7878/api/v1/alltasks";
class AllTaskService {
  createTask(alltasks) {
    console.log(localStorage.getItem("token"));
    return axios.post(TODOLIST_API_BASE_URL, alltasks,{
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

  getSearchData(pageNumber,textSearch) {
    let pagedata = 4;
      textSearch = textSearch.trim();
    //  textSearch ="";
    return axios.get(TODOLIST_API_BASE_URL + "/searchall?pageNumber="+pageNumber+"&pageData="+pagedata+"&textSearch="+textSearch, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  updateTaskById(data) {
    return axios.put(TODOLIST_API_BASE_URL + "/updatetask" ,data, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

}

export default new AllTaskService();