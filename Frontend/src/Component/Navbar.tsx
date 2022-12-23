import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { Login } from "@mui/icons-material";
import {  useNavigate } from "react-router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Navbar = () => {
  let navigate = useNavigate();

  const [value, setValue] = useState(0);

  return (
    <React.Fragment>
      <AppBar sx={{ transform: "scale(1)", background: "#063970" }}>
        <Toolbar>
          <BusinessIcon sx={{ transform: "scale(1.3)" }} />
          <Tabs
            sx={{ marginLeft: "15px" }}
            indicatorColor="primary"
            textColor="inherit"
          >
            <Tab label="Home" onClick={() => navigate("/Home")} />
            <Tab label="Employee" onClick={() => navigate("/Employees")} />
            <Tab label="Mark Attendance" onClick={() => navigate("/MarkAttendance")} />
            {/* <Tab label="Attendance" onClick={() => navigate("/Attendance")} /> */}
            <Tab
              label="Add New Employee"
              onClick={() => navigate("/AddEmployee")}
            />

          </Tabs>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            sx={{ marginLeft: "auto" }}
            variant="contained"
          >
            Log-out <Login />
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
