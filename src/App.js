import React, { useState } from "react";
import LoginComponent from "./components/LoginComponent";
import NavbarPage from "./components/NavbarPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import TodoList from "./components/TodoList";
import LogoutComponent from "./components/LogoutComponent";

export const TaskContext = React.createContext();
function App() {
  const [auth, setAuth] = useState(localStorage.getItem('Authorization') === null ? false : true);
  return (
    <div className="App">
      <header className="App-header">
        <TaskContext.Provider value={[auth, setAuth]}>
          <Router>
            <NavbarPage />
            <Routes>
              <Route path="/" element={<RegisterComponent />} />
              <Route path="/LoginComponent" element={<LoginComponent />} />
              <Route path="/TodoList" element={<TodoList />} />
              <Route path="/LogoutComponent" element={<LogoutComponent />} />
            </Routes>
          </Router>


        </TaskContext.Provider>

      </header>
    </div>
  );
}

export default App;
