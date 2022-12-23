import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ApiConstrains } from "../Api/ApiConstrains";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Custon_Axios from "../Axios/Custom";

const Login = () => {
  let navigate = useNavigate();
  let username: any = React.useRef();
  let password: any = React.useRef();

  const loginApp = async () => {
    if (username.current.value == "" || password.current.value == "") {
      return;
    }
    try {
      const response = await Custon_Axios.post(ApiConstrains.Admin, {
        username: username.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      navigate("/Home");
    } catch (error: any) {
      if (error.response.status == 401) toast.warn(error.response.data.message);
    }
  };
  const avatarStyle = { backgroundColor: "#1244B8" };
  return (
    <div className="login-box">
      <CardContent>
        <Grid container spacing={2} minHeight={100}>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Avatar style={avatarStyle} />
          </Grid>
        </Grid>

        <Typography variant="h5" component="div">
          <h1>Welcome to K-Hive</h1>{" "}
        </Typography>

        <br />
        <br />
        <div className="user-box">
          <input ref={username} name="username" type="username" />
          <label> Username</label>
        </div>

        <div className="user-box">
          <input
            ref={password}
            type="password"
            name="password"
            autoComplete="current-password"
          />
          <label> Password</label>
        </div>

        <Grid xs display="flex" justifyContent="center">
          <CardActions>
            <Button onClick={loginApp} variant="contained">
              Login
            </Button>
          </CardActions>
        </Grid>
      </CardContent>
    </div>
  );
};

export default Login;
