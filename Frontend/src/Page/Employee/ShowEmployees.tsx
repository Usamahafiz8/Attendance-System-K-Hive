import React from "react";
import { ApiConstrains } from "../../Api/ApiConstrains";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import Custon_Axios from "../../Axios/Custom";

interface UserModel {
  Name: string;
  Department: string;
  Email: string;
  id: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ShowEmployees = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);
  let navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await Custon_Axios.get(
      ApiConstrains.Employee.AllEmployee,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setUsers(response.data);
  };

  function EmployeeInfo(id: string): void {
    navigate("/EmployeesInfo/" + id);
  }

  React.useEffect(() => {
    if (users.length == 0) getAllUsers();
  });

  return (
    <div>
      <Navbar></Navbar>
      <br />
      <h1>Employees</h1>

      <TableContainer component={Paper} sx={{ maxHeight: 800 }}>
        <Table
          sx={{ minWidth: 1100, maxHeight: 800 }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Deparment</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow
                onClick={() => EmployeeInfo(user.id)}
                key={user.id}
              >
                <StyledTableCell align="left">{user.Name}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.Department}
                </StyledTableCell>
                <StyledTableCell align="left">{user.Email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShowEmployees;
