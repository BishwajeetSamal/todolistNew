import React, { useState, useEffect } from "react";
import AllTaskService from "../service/AllTaskService";

function TodoList() {
  const [task, setTasks] = useState("");
  const [totalcountRecord, setTotalCountRecord] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePreviousClick = () => {
    setPageNumber((count) => count - 1);
  }


  const handleNextClick = () => {
    setPageNumber((count) => count + 1);
  }


  const [submitTaskAdd, setSubmitTaskAdd] = useState([]);

  useEffect(() => {
    AllTaskService.getAlldataOnload(pageNumber).then((res) => {
      if (res) {
        let dta = res.data.obj.tasks.content || [];
        let setCount = res.data.obj.count || 0;
        setSubmitTaskAdd(dta);
        setTotalCountRecord(setCount);
      }
    });
  }, [pageNumber]);

  function checkEmail() { }
  function makeTrue(id) {
    AllTaskService.updateLineOnTask(id).then((res) => {
      if (res.data.active === true) {
        let text = document.getElementsByClassName("class_" + res.data.id)[0]
          .innerText;
        document.getElementsByClassName("class_" + res.data.id)[0].innerHTML =
          "<s>" + text + "</s>";
      }
      // submitTaskAdd.push(res.data);
      // setSubmitTaskAdd(submitTaskAdd);
    });
  }

  function changeTasks(e) {
    setTasks(e.target.value);
  }

  // function validation(email) {
  //   console.log(email);
  //   console.log(Date.now());
  // }
  function saveTask(e) {
    let getTime = document.getElementById("tasktime").value;
    let getEmailid = document.getElementById("emailId").value;
    // validation(email);
    e.preventDefault();
    if (task !== "") {
      let getTask = {
        taskrow: task,
        userId: 1,
        isActive: false,
        userTime: getTime,
        emailId: getEmailid,
      };

      AllTaskService.createTask(getTask).then((res) => {
        console.log(res);
        if(res!=null){
          AllTaskService.getAlldataOnload(1).then((resp) => {
            if (resp) {
              let dta = resp.data.obj.tasks.content || [];
              let setCount = resp.data.obj.count || 0;
              setSubmitTaskAdd(dta);
              setTotalCountRecord(setCount);
            }
          });
        }
        setTasks("");
      });
    } else {
      document.getElementById();
    }
  }
  return (
    <>
      <div className="">
        <h1 className="text-center">
          {localStorage.getItem("organisation")} TodoList
        </h1>
        <div className="container">
          <div className="row">
            {/* {submitTaskAdd}  using directly like this problematic */}
            <div className="card col-md-6 offset-md-3 ">
              <h3 className="text-center">
                {localStorage.getItem("userName")} have {totalcountRecord}{" "}
                Todos
              </h3>
              <div className="card-body">
                <form>
                  <div className="text-center text-muted">
                    <h3>Add Task</h3>
                  </div>
                  <div class="form-group">
                    <label className="text-muted">Add Task</label>
                    <input
                      type="text"
                      placeholder="Add task"
                      name="firstname"
                      className="form-control"
                      value={task}
                      onChange={changeTasks}
                      checked
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted" for="tasktime">
                      Add Due Date:
                    </label>
                    <input
                      type="datetime-local"
                      id="tasktime"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted" for="email">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="emailId"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={checkEmail}
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-success mt-1" onClick={saveTask}>
                      Save
                    </button>
                  </div>
                  <h2 id="showMsg" class="hideMessage">
                    This heading is hidden
                  </h2>

                  <span style={{ marginTop: "10px" }}></span>
                </form>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Task ID</th>
                      <th scope="col">Task</th>
                      <th scope="col">Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submitTaskAdd.map((res) => {
                      var dateTime = new Date(res.deadLine).toLocaleDateString(
                        "en-US"
                      );
                      return (
                        <tr
                          key={res.id}
                          style={{
                            color: Date.now() > res.deadLine ? "red" : "black",
                          }}
                        >
                          <td>
                            {res.active ? (
                              <input
                                type="checkbox"
                                value={res.id}
                                onClick={() => makeTrue(res.id)}
                                checked
                              />
                            ) : (
                              <input
                                type="checkbox"
                                value={res.id}
                                onClick={() => makeTrue(res.id)}
                              />
                            )}
                          </td>
                          <td>{res.id}</td>
                          <td>
                            {res.active ? (
                              <div className={`class_${res.id}`}>
                                <s>{res.taskrow}</s>
                              </div>
                            ) : (
                              <span className={`class_${res.id}`}>
                                {res.taskrow}
                              </span>
                            )}
                          </td>
                          <td>{res.emailId}</td>
                          <td>{dateTime}</td>
                          <td>
                            {new Date(
                              new Date(res.deadLine)
                            ).toLocaleTimeString()}
                          </td>
                          <td>
                            <button type="button" class="btn btn-primary">
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ float: "right" }}>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous" onClick={handlePreviousClick} style={{ pointerEvents: pageNumber <= 1 ? "none" : "", color: pageNumber <= 1 ? "gray" : "" }}><span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>

                      <li class="page-item"><a class="page-link" href="#">{pageNumber}</a></li>

                      <li class="page-item"><a class="page-link" aria-label="Next" onClick={handleNextClick} style={{ pointerEvents: pageNumber >= Math.ceil(totalcountRecord / 4) ? "none" : "", color: pageNumber >= Math.ceil(totalcountRecord / 4) ? "gray" : "" }}> <span aria-hidden="true">&raquo;</span></a></li>
                    </ul>
                  </nav></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
