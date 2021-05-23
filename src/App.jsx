import { Box, Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import MyAppBar from "./component/MyAppbar";
import AuthenticationContextProvider from "./context/AuthenticationContextProvider";
import { Protect } from "./Protect";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

function App() {
  return (
    <Router>
      <AuthenticationContextProvider>
        <MyAppBar />
        <Container component="main" maxWidth="xs">
          <Box marginTop={10}>
            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/">
                <Protect>
                  <Home />
                </Protect>
              </Route>
            </Switch>
          </Box>
        </Container>
      </AuthenticationContextProvider>
    </Router>
  );
}

export default App;
