import {
  TextField,
  Typography,
  makeStyles,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button,
  Grid,
  Link as LinkC,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Formik } from "formik";
import { Link } from "react-router-dom";

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
}));

export default function SignIn() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5" component="h1">
        Sign in
      </Typography>
      <Formik>
        <form className={classes.form}>
          <TextField
            variant="standard"
            name="email"
            id="email"
            label="Email Address"
            autoComplete="email"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <LinkC variant="body2">
                <Link to="/signup" className={classes.link}>
                  Don't have an account? Register
                </Link>
              </LinkC>
            </Grid>
          </Grid>
        </form>
      </Formik>
    </div>
  );
}
