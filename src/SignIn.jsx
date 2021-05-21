import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import authManger from "./services/auth";
import httpClient from "./services/http";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  checkbox: {
    marginTop: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "500px",
  },
  loader: {
    color: "white",
    marginRight: "20px",
  },
  formTitle: {
    marginBottom: theme.spacing(3),
  },
}));

const validate = yup.object({
  password: yup
    .string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  username: yup
    .string()
    .required("Required")
    .min(8, "Must be atleast 8 characters"),
});

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitCredential = (user) => {
    setLoading(true);
    httpClient
      .post("/api/auth/signin", user)
      .then((res) => {
        console.log("logged in");
        authManger.setToken(res.headers.authorization);
        history.push("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMsg("Invalid username/password");
        } else {
          console.log("Error signin : " + error);
          setErrorMsg("Something went wrong. please try after sometime.");
        }
      });
    setLoading(false);
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5" component="h1" className={classes.formTitle}>
        Sign in
      </Typography>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : ""}
      <Formik
        validateOnChange={false}
        initialValues={{
          password: "",
          username: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setLoading(true);
          submitCredential(values);
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              name="username"
              id="username"
              label="Username/Email Address"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              margin="normal"
              fullWidth
              autoFocus
              required
            />
            <TextField
              variant="standard"
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              margin="normal"
              fullWidth
              autoFocus
              required
            />
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              className={classes.checkbox}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={20} className={classes.loader} />
              ) : (
                ""
              )}
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  variant="body2"
                  to="/signup"
                  className={classes.link}
                  component={RouterLink}
                >
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Modal
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        open={loading}
      >
        <div></div>
      </Modal>
    </div>
  );
}
