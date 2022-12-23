import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { ApiConstrains } from "../Api/ApiConstrains";
// import Custon_Axios from "../Axios/Custom";
import Navbar from "./Navbar";
import { Line } from "react-chartjs-2";

// import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { Line } from "react-chartjs-2";
import { Dataset, FlightTakeoffRounded, LabelSharp } from "@mui/icons-material";
import Custon_Axios from "../Axios/Custom";

///Chart Data
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["jun", "july", "Auguest", "sep", "oct", "nov", "dec"];
//const labels: never[] =  []

interface EmployeeInfo {
  Name: string;
  Department: string;
  Email: string;
  id: string;
  Present: String;
  Absent: String;
  late: String;
  leave: String;
  Date: String;
  Status: String;
  Time: String;
}

const EmployeeInfo = () => {
  const [Employee, setEmployee] = React.useState<EmployeeInfo>();
  const [Attendance, setAttendance] = React.useState<EmployeeInfo>();
  const [DateWise, setDateWise] = React.useState<EmployeeInfo[]>([]);
  const params = useParams();
  const id: any = params.userid;

  //Getting Employee Info from the ID
  const EmployeeInfomation = async (_id: string) => {
    console.log({ id });

    const response = await Custon_Axios.get(
      ApiConstrains.Employee.FindEmployee(_id),
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setEmployee(response.data);
    console.log(setEmployee);
  };
  React.useEffect(() => {
    EmployeeInfomation(id);
  }, []);

  //Getting Employee Info from the ID
  const AttendanceInformation = async (_id: string) => {
    console.log({ id });

    const response = await Custon_Axios.get(
      ApiConstrains.Attendance.GetEmployeeAttendance(_id),
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setAttendance(response.data);
    console.log(setAttendance);
  };
  React.useEffect(() => {
    AttendanceInformation(id);
  }, []);

  //Get atttehdanc by Datewise
  const AttendanceDAteWise = async (_id: string) => {
    console.log({ id });

    const response = await Custon_Axios.get(
      ApiConstrains.Attendance.GetAttendanceDateWie(_id),
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setDateWise(response.data);
    console.log(setDateWise);
  };
  React.useEffect(() => {
    AttendanceDAteWise(id);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Present",
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: "Blue",
      },
      {
        label: "Absent",
        data: [4, 3, 1, 5, 6, 9],
        borderColor: "Red",
      },
    ],
  };

  console.log(DateWise);

  return (
    <div style={{ display: "grid" }}>
      <Navbar></Navbar>
      {/* this is where we butt the chart */}
      <div>
        <div className="info">
          <div>
            <br />
            <h1>Employee Information</h1>
            <div className="user-box">
              <label htmlFor=""> Name : {Employee?.Name}</label>
            </div>

            <div>
              <div className="user-box">
                <label htmlFor="">
                  <br />
                  Department: {Employee?.Department}
                </label>
              </div>
              <div className="user-box">
                <label htmlFor="">
                  <br /> <br /> Email: {Employee?.Email}
                </label>
              </div>
              <br />
              <br />
              <br />
              <div className="user-box">
                <label htmlFor="">
                  <br /> <br /> Total Present : {Attendance?.Present}
                </label>
              </div>
              <br />
              <div className="user-box">
                <label htmlFor="">
                  <br /> <br /> Total Absent : {Attendance?.Absent}
                </label>
              </div>
              <br />
              <div className="user-box">
                <label htmlFor="">
                  <br /> <br /> Total leave : {Attendance?.leave}
                </label>
                <br />
              </div>
              <div className="user-box">
                <label htmlFor="">
                  <br /> <br /> Total late : {Attendance?.late}
                </label>
              </div>
              <br />
              <br /> <br />
              <br />
            </div>
            <div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="chart">
        {/* show chart */}

        <h1>Attendance Chart</h1>
        <div>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Present",
                  data: [1, 2, 3, 4, 5, 6, 7],
                  borderColor: "Blue",
                },
                {
                  label: "Absent",
                  data: [4, 3, 1, 5, 6, 9],
                  borderColor: "Red",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
