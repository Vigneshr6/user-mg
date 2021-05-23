import { AuthenticationContext, logout } from "../service/auth";
import { useContext } from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function MyAppBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);
  const classes = useStyle();

  const doLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          UserMg
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={doLogout}>
            Logout
          </Button>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
}
