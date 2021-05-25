import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function FullscreenSpinner() {
  const classes = useStyles();

  return (
    <Backdrop
      open={true}
      className={classes.backdrop}
    >
      <CircularProgress size={70} color="inherit" />
    </Backdrop>
  );
}
