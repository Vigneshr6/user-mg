import {
  Button,
  CircularProgress,
  Dialog,
  Fade,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
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
  container: {
    padding: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setopenDialog] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setopenDialog(true);
  };

  const handleDialogClose = () => {
    setopenDialog(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
        >
          Modal
        </Button>
      </div>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDialogOpen}
        >
          Dialog
        </Button>
      </div>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setLoading(true);
          }}
        >
          {loading ? (
            <CircularProgress size={20} className={classes.loader} />
          ) : (
            ""
          )}
          Spinner
        </Button>
      </div>
      <Modal
        open={open}
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={open}>
          <div className={classes.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            voluptatem harum, ab aperiam repellendus architecto nisi neque,
            porro accusamus nihil autem vitae ad. Temporibus suscipit
            accusantium adipisci, neque sapiente odit.
          </div>
        </Fade>
      </Modal>
      <Modal
        open={loading}
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        <div></div>
      </Modal>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <Alert variant="outlined" severity="success">
          <AlertTitle>Success</AlertTitle>
          <br/>
          Registered — <strong>successfully!</strong>
        </Alert>
      </Dialog>
    </div>
  );
}
