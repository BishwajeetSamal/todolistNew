import React, { useState, useEffect } from "react";
import AllTaskService from "../service/AllTaskService"; 
import {Button,Form,Modal} from "react-bootstrap";

function TodoList() {
  const [task, setTasks] = useState("");
  const [timeVal, seTimeVal] = useState("");
  const [desc, setDesc] = useState("");
  const [totalcountRecord, setTotalCountRecord] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [show, setShow] = useState(false);
  const [editTaskVal, setEditTaskVal] = useState("");
  const [editDescVal, setEditDescVal] = useState("");
  const [editTimeVal, setEditTimeVal] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    console.log("data==========================>>>");
    console.log(data);
    setEditTaskVal(data.taskrow);
    setEditDescVal(data.description);
    setEditTimeVal(data.deadLine);
    
    
    console.log(editTimeVal);
    //  let taskName = document.getElementById("task_"+id).innerHTML;
    // console.log(taskName);
    
    //  document.getElementById("taskedit_detail").innerHTML=taskName;
    setShow(true);
  };


  const handlePreviousClick = () => {
    setPageNumber((count) => count - 1);
  }


  const handleNextClick = () => {
    setPageNumber((count) => count + 1);
  }


  const [submitTaskAdd, setSubmitTaskAdd] = useState([]);

  useEffect(() => {
    AllTaskService.getSearchData(pageNumber,searchText).then((res) => {
      if (res) {
        console.log(res);
        let dta = res.data.obj.tasks || [];
        let setCount = res.data.obj.count || 0;
        setSubmitTaskAdd(dta);
        setTotalCountRecord(setCount);
      }
    });
  }, [pageNumber,searchText]);

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

  function changeTime(e){
    seTimeVal(e.target.value);
  }

  function changeText(e){
    setDesc(e.target.value);
    console.log(e.target.value);
  }

  let changeSearch = (e) =>{
    setSearchText(e.target.value);
  }

  // function seachByTask(){
  //   AllTaskService.getSearchData(searchText).then((res) => {
  //     if (res) {
  //       let dta = res.data.obj.tasks.content || [];
  //       setSubmitTaskAdd(dta);
  //     }
  //   });

  // }
  // function validation(email) {
  //   console.log(email);
  //   console.log(Date.now());
  // }
  function saveTask(e) {
    let getTime = document.getElementById("tasktime").value;
    let getDesc = desc;
    // validation(email);
    e.preventDefault();
    if (task !== "") {
      let getTask = {
        taskrow: task,
        userId: 1,
        isActive: false,
        userTime: getTime,
        description: getDesc,
      };
      console.log(getTask);

      AllTaskService.createTask(getTask).then((res) => {
        console.log(res);
        if(res!=null){
          AllTaskService.getAlldataOnload(1).then((resp) => {
            if (resp) {
              console.log(resp);
              let dta = resp.data.obj.tasks || [];
              let setCount = resp.data.obj.count || 0;
              setSubmitTaskAdd(dta);
              setTotalCountRecord(setCount);
            }
          });
        }
        setTasks("");
        setDesc("");
        
      });
    } else {
      document.getElementById();
    }
  }
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="taskedit_detail">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task"
                value={editTaskVal}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput2">
              <Form.Label>Description</Form.Label>
              <Form.Control
              as="textarea" rows={3} 
                placeholder="Description"
                value={editDescVal}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="ControlInput3"
            >
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder=""
                 value={editTimeVal}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="">
        <h1 className="text-center">
          {localStorage.getItem("organisation")} TodoList
        </h1>
        <div className="container-fluid">
          <div className="row">
            {/* {submitTaskAdd}  using directly like this problematic */}
            <div className="card col-md-8 offset-md-2 ">
              <h3 className="text-center">
                {localStorage.getItem("userName")} have {totalcountRecord}{" "}
                Todos
              </h3>
              <div className="card-body">
                <form>
                  <div className="text-center text-muted">
                    <h3>Add Task</h3>
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Add Task</label>
                    <input
                      type="text"
                      placeholder="Add task"
                      name="firstname"
                      className="form-control"
                      value={task}
                      onChange={changeTasks}
                      checked
                      autocomplete="off"
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
                      onChange={changeTime}
                      value={timeVal}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted" for="description">
                      Description
                    </label>
                    <textarea
                    rows="5"
                      type="text"
                      className="form-control"
                      placeholder="Enter Description"
                      onChange={changeText}
                      value={desc}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-success mt-1" onClick={saveTask}>
                      Save
                    </button>
                  </div>
                  <h2 id="showMsg" className="hideMessage">
                    This heading is hidden
                  </h2>

                  <span style={{ marginTop: "10px" }}></span>
                </form>
                <div class="row mt-3 align-items-center">
        <div class="col col-md-4">
            <input class="form-control border-secondary rounded-pill pr-5" type="search" placeholder="search" id="search_input" onChange={changeSearch}/> 
        </div>
        <div class="col-auto">
            <button class="btn btn btn-success  border-0 rounded-pill"  type="button">
                Search
            </button>
        </div>
    </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Task ID</th>
                      <th scope="col">Task</th>
                      <th scope="col">Description</th>
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
                          <td style={{wordwWrap: "break-word",minWidth: "160px" ,maxWidth: "260px"}}>
                            {res.active ? (
                              <div className={`class_${res.id}` }>
                                <s>{res.taskrow}</s>
                              </div>
                            ) : (
                              <span className={`class_${res.id}`} id={`task_${res.id}`}>
                                {res.taskrow}
                              </span>
                            )}
                          </td>
                          <td style={{wordWrap: "break-word",minWidth: "160px",maxWidth: "360px"}}>{res.description}</td>
                          <td>{dateTime}</td>
                          <td>
                            {new Date(
                              new Date(res.deadLine)
                            ).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})}
                          </td>
                          <td>
                            <Button variant="primary" onClick={()=>handleShow(res)}>
                                Edit
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ float: "right" }}>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous" onClick={handlePreviousClick} style={{ pointerEvents: pageNumber <= 1 ? "none" : "", color: pageNumber <= 1 ? "gray" : "" }}><span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>

                      <li className="page-item"><a className="page-link" href="#">{pageNumber}</a></li>

                      <li className="page-item"><a className="page-link" aria-label="Next" onClick={handleNextClick} style={{ pointerEvents: pageNumber >= Math.ceil(totalcountRecord / 4) ? "none" : "", color: pageNumber >= Math.ceil(totalcountRecord / 4) ? "gray" : "" }}> <span aria-hidden="true">&raquo;</span></a></li>
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
