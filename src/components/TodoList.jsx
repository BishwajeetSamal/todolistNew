import React, { useState } from "react";
import AllTaskService from "../service/AllTaskService";

function TodoList() {
  const [task, setTasks] = useState("");
  const [submitTaskAdd, setSubmitTaskAdd] = useState([]);
  function changeTasks(e) {
    setTasks(e.target.value);
  }
  function saveTask(e) {
    e.preventDefault();
    let getTask = {
      taskrow: task,
      userId: 1,
    };
    console.log("tasks=>" + JSON.stringify(getTask));
    AllTaskService.createTask(getTask).then((res) => {
      setSubmitTaskAdd((...prev) => {
        prev = res.data.taskrow;
        console.log(prev);
      });
      console.log(res);
      setTasks("");
    });
  }
  return (
    <>
      <div className="">
        <h1 className="text-center">TodoList</h1>
        <h1>
          {" "}
          {submitTaskAdd.map((resp) => {
            return console.log(resp);
          })}
        </h1>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 ">
              <h3 className="text-center">You have 44 Todos</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Add task"
                      name="firstname"
                      className="form-control"
                      value={task}
                      onChange={changeTasks}
                    />
                    <button className="btn btn-success mt-1" onClick={saveTask}>
                      Save
                    </button>
                  </div>

                  <span style={{ marginTop: "10px" }}></span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
