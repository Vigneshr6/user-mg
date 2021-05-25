import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  error: {
    margin: "50px",
  },
}));

export default function DefaultError() {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <Alert variant="outlined" severity="error">
        Something went wrong. please try after soemtime.
      </Alert>
    </div>
  );
}
