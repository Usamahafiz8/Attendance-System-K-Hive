import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import Navbar from "./Component/Navbar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoutes";
import AddEmployee from "./Page/Employee/AddEmployee";
import MarkAttendance from "./Page/Attendance/MarkAttendance";
import ShowEmployees from "./Page/Employee/ShowEmployees";
import Home from "./Page/Home";
import EmployeeInfo from "./Component/EmployeeInfo";
import AllEmployeeAttendance from "./Page/Attendance/AllEmployeeAttendance";
import ShowEmployee from "./Page/Employee/showEmployee";

function App() {
  return (
    <BrowserRouter>
      {/* <ToastContainer
        autoClose={3000}
        position={"top-center"}
        hideProgressBar={true}
      /> */}

      <Routes>
        {/* <Route path='/' element={<div>Welcome to K-Hive</div> } /> */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route
          path="/AddEmployee"
          element={
            <ProtectedRoute>
              {" "}
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Attendance"
          element={
            <ProtectedRoute>
              {" "}
              <AllEmployeeAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Employees"
          element={
            <ProtectedRoute>
              {" "}
              <ShowEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EmployeesInfo/:userid"
          element={
            <ProtectedRoute>
              {" "}
              <EmployeeInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MArkAttendance"
          element={
            <ProtectedRoute>
              {" "}
              <MarkAttendance />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
