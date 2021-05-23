import { CircularProgress, makeStyles, RootRef } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  error: {
    margin: "50px",
  },
}));

export default function Resource(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const classes = useStyles();

  useEffect(() => {
    let root = {};
    props
      .call(RootRef)
      .then((data) => {
        setData(root);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const renderError = () => {
    return (
      <div className={classes.error}>
        <Alert variant="outlined" severity="error">
          Something went wrong. please try after soemtime.
        </Alert>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        renderError()
      ) : (
        props.component(data)
      )}
    </>
  );
}
