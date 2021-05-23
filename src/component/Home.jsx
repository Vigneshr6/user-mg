import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState, useEffect } from "react";
import { getUserId } from "../service/auth";
import { httpClient } from "../service/http";

const useStyles = makeStyles((theme) => ({
  error: {
    margin: "50px",
  },
  paper: {
    // margin: theme.spacing(2),
  },
}));

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const classes = useStyles();

  useEffect(() => {
    let userId = getUserId();
    httpClient
      .get("/api/users/" + userId)
      .then((res) => {
        setUser(res.data);
        console.log(JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div className={classes.error}>
          <Alert variant="outlined" severity="error">
            Something went wrong. please try after soemtime.
          </Alert>
        </div>
      ) : (
        <Paper className={classes.paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right">Email :</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Dob :</TableCell>
                <TableCell>{user.dob}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  );
}
