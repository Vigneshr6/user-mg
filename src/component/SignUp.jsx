import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Backdrop,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";
import { AuthenticationContext, setToken } from "../service/auth";
import { httpClient } from "../service/http";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  date: {
    margin: theme.spacing(3, 0),
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
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().required("Required").email(),
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
    .min(8, "Must be atleast 8 characters")
    .test("checkUsername", "Username already exists", async (value) => {
      if (!value) {
        return false;
      }
      let res = await checkUsername(value);
      if (res.data) {
        return false;
      }
      return true;
    }),
});

const checkUsername = async (value) => {
  return httpClient.get("/api/auth/isexists", {
    params: {
      username: value,
    },
  });
}

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setIsLoggedIn } = useContext(AuthenticationContext);

  const createUser = (form) => {
    console.log("form : " + JSON.stringify(form));
    httpClient
      .post("/api/auth/signup", form, {
        headers: {
          // "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("success : " + res.status);
        let token = res.headers.authorization;
        // console.log("token got : " + token);
        setToken(token);
        setIsLoggedIn(true);
        setShowSuccess(true);
      })
      .catch((error) => {
        console.log("error while creating user: " + error);
        setShowError(true);
      });
    setLoading(false);
  };

  const gotoNext = () => {
    setShowSuccess(false);
    history.push("/");
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" className={classes.formTitle}>
        Sign up
      </Typography>
      {showError ? (
        <Alert severity="error">
          Something went wrong. please try after sometime.
        </Alert>
      ) : (
        ""
      )}
      <Formik
        validateOnChange={false}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          dob: new Date().toISOString().replace(/T.+/g, ""),
          username: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setLoading(true);
          createUser(values);
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
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  variant="standard"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  required
                  autoFocus
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="standard"
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  required
                />
              </Grid>
            </Grid>
            <TextField
              variant="standard"
              name="email"
              id="email"
              label="Email Address"
              autoComplete="email"
              margin="normal"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              required
            />
            <TextField
              variant="standard"
              name="username"
              id="username"
              label="User Name"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              fullWidth
              required
            />
            <TextField
              variant="standard"
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              margin="normal"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
              required
            />
            <TextField
              type="date"
              name="dob"
              id="dob"
              className={classes.date}
              //   defaultValue={values.dob}
              value={values.dob}
              onChange={handleChange}
              label="Date of birth"
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth color="primary">
              {loading ? (
                <CircularProgress size={20} className={classes.loader} />
              ) : (
                ""
              )}
              Sign Up
            </Button>
          </form>
        )}
      </Formik>
      {/* <Modal
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        open={loading}
      >
        <div></div>
      </Modal> */}
      <Backdrop open={loading} style={{ backgroundColor: "transparent",zIndex:"100"}}>
      <CircularProgress size={70}/>

      </Backdrop>
      <Dialog open={showSuccess}>
        <Alert severity="success" variant="outlined">
          Registered — <strong>successfully!</strong>
        </Alert>
        <DialogActions>
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={gotoNext}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
