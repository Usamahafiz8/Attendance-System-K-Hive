import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiConstrains } from "../../Api/ApiConstrains";
import Custon_Axios from "../../Axios/Custom";
import Navbar from "../../Component/Navbar";

const AddEmployee = () => {
  let navigate = useNavigate();
  let Name: any = React.useRef();
  let Department: any = React.useRef();
  let Email: any = React.useRef();

  const register = async () => {
    const response = await Custon_Axios.post(
      ApiConstrains.Employee.AddEmployee,
      {
        Name: Name.current.value,
        Email: Email.current.value,
        Department: Department.current.value,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    console.log(response.data);

    navigate("/Employees");
  };

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="login-box">
        <div>
          <h1>Add New Employee</h1>
          <form>
            <div className="user-box">
              <input ref={Name} id="Name" type="text" />
              <label> Name</label>
            </div>

            <div className="user-box">
              <input ref={Email} id="Email" type="Email" />
              <label> Email</label>
            </div>
            <div>
              <div className="user-box">
                <input ref={Department} id="Department" type="Department" />
                <label> Department</label>
              </div>
              <br />
            </div>
            <div>
              <Button onClick={register} variant="contained">
                AddEmployee
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
