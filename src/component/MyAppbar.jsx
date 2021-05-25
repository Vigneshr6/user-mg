import { AuthenticationContext, logout } from "../service/auth";
import { useContext } from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
  Link as MuiLink
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
        <MuiLink color="inherit" underline="none" component={Link} to="/"  className={classes.title}>
          <Typography variant="h6">
            UserMg
          </Typography>
        </MuiLink>
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
