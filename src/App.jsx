import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import { Protect } from "./Protect";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Container component="main" maxWidth="xs">
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
      </Container>
    </Router>
  );
}

export default App;
