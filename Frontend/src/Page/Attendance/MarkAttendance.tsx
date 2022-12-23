import React, { useState } from "react";
import { ApiConstrains } from "../../Api/ApiConstrains";
import DoneIcon from "@mui/icons-material/Done";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import Paper from "@mui/material/Paper";
import {
  Accordion,
  Box,
  Button,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TablePagination,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Navbar from "../../Component/Navbar";
import { blue } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import moment, { Moment } from "moment";
import Custon_Axios from "../../Axios/Custom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface EmployeeModel {
  Name: string;
  Department: string;
  Email: string;
  id: string;
}

type TAttendance = "" | "Present" | "Absent" | "late" | "leave";

const EmployeeRow = ({
  Employee,
}: {
  Employee: { id: string; Name: string };
}) => {
  const [attendance, setAttendance] = useState<TAttendance>("");

  console.log({ attendance });

  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const AltendanceMark = async (_id: string, Status: any) => {
    console.log(Status);

    const response = await Custon_Axios.post(
      ApiConstrains.Attendance.MarkAttendace(_id),
      {
        Status: Status,
        Time: moment().format("LT"),
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        console.log(res);
        console.log();
      })
      .catch((e) => {
        console.log(e);
        console.log(moment().format("LT"));
      });
  };

  const [formats, setFormats] = React.useState(() => [
    "Present",
    "Absent",
    "late",
    "leave",
  ]);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="left">{Employee.Name}</StyledTableCell>
      <StyledTableCell align="right">
        <div></div>

        <ToggleButtonGroup exclusive value={formats} onChange={handleFormat}>
          <ToggleButton
            onClick={(e: any) => AltendanceMark(Employee.id, "Present")}
            value="Present"
          >
            <h4 className="present">Present</h4>
          </ToggleButton>
          <ToggleButton
            onClick={(e: any) => AltendanceMark(Employee.id, "Absent")}
            value="Absent"
          >
            <h4 className="Absent">Absent</h4>
          </ToggleButton>
          <ToggleButton
            onClick={(e: any) => AltendanceMark(Employee.id, "late")}
            value="Late"
          >
            <h4 className="late">Late</h4>
          </ToggleButton>
          <ToggleButton
            onClick={(e: any) => AltendanceMark(Employee.id, "leave")}
            value="leave"
          >
            <h4 className="leave">Leave</h4>
          </ToggleButton>
        </ToggleButtonGroup>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const MarkAttendance = () => {
  const [Employees, setEmployees] = React.useState<EmployeeModel[]>([]);

  let Status: any = React.useRef("");

  const getAllEmployees = async () => {
    const response = await Custon_Axios.get(
      ApiConstrains.Employee.AllEmployee,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setEmployees(response.data);
  };

  React.useEffect(() => {
    if (Employees.length == 0) getAllEmployees();
  }, []);
  const handleClick = (event: any, param: any) => {
    console.log(event);
    console.log(param);
    console.log(moment().format());
  };

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="TableT">
        <h1>Mark Attendance</h1>

        <TableContainer
          sx={{ minWidth: 200, maxHeight: 800, borderStyle: "none" }}
        >
          <Table
            sx={{
              minWidth: 100,
              maxHeight: 500,
              borderStyle: "none",
              color: "white",
            }}
            aria-label="customized table"
            stickyHeader
          >
            <>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Attendance</StyledTableCell>
              </TableRow>
            </>
            <TableBody>
              {Employees.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((Employee) => (
                <EmployeeRow key={Employee.id} Employee={Employee} />
              ))}{" "}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "white" }}
        />
      </div>
    </div>
  );
};

export default MarkAttendance;
