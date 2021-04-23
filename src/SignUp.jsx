import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Formik } from "formik";
import * as yup from "yup";

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
  userName: yup.string().required().min(8, "Must be atleast 8 characters"),
});

export default function SignUp() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Formik
        validateOnChange={false}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          dob: new Date().toISOString().replace(/T.+/g, ""),
          userName: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
              name="userName"
              id="userName"
              label="User Name"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.userName && Boolean(errors.userName)}
              helperText={touched.userName && errors.userName}
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
              Sign Up
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
