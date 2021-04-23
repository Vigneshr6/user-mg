import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Form, Formik } from "formik";

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
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  date: {
    margin: theme.spacing(3, 0),
  },
}));

const validateRequired = (value, field, errors) => {
  if (!value) {
    errors[field] = "Required";
  }
};

const validate = (value, field, errors, ...validators) => {
  for (let i = 0; i < validators.length; i++) {
    let v = validators[i];
    v(value, field, errors);
    if (errors[field]) {
      break;
    }
  }
};

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
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          dob: new Date().toISOString().replace(/T.+/g, ""),
          userName: "",
        }}
        validate={(values) => {
          console.log("validate");
          const errors = {};
          validate(
            values.email,
            "email",
            errors,
            validateRequired,
            (value, field, errors) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                errors[field] = "Invalid email address";
              }
            }
          );
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, touched ,errors, handleChange, handleSubmit, handleBlur }) => (
          <Form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  variant="standard"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
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
              error={touched.email && errors.email !== ""}
              helperText={touched.email ? errors.email: ""}
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
