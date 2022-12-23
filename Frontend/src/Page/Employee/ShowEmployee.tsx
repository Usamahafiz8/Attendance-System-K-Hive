import React from "react";
import { ApiConstrains } from "../../Api/ApiConstrains";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import { TablePagination, Typography } from "@mui/material";
import Custon_Axios from "../../Axios/Custom";

interface UserModel {
  Name: string;
  Department: string;
  Email: string;
  id: string;
}

const ShowEmployee = () => {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(6);
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
      <br />
      <div className="TableT">
        <h3> Employees</h3>
        {/* <Paper sx={{ width: '100%' }}> */}

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
                <TableCell>
                  {" "}
                  <Typography variant="body1" color="primary">
                    <b> Name </b>
                  </Typography>{" "}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" color="primary">
                    <b>Department</b>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" color="primary">
                    <b>Email</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow onClick={() => EmployeeInfo(user.id)} key={user.id}>
                    <TableCell align="left">
                      {" "}
                      <Typography variant="body1" color="white">
                        {user.Name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <Typography variant="body1" color="white">
                        {user.Department}{" "}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <Typography variant="body1" color="white">
                        {" "}
                        {user.Email}
                      </Typography>{" "}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
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

export default ShowEmployee;
