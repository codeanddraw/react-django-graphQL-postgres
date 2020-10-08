import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Container from 'react-bootstrap/Container'
import LandingPage from "./container/LandingPage";
import MapPage from "./container/MapPage";

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => {
          return (
            <Container fluid="md">
              <TransitionGroup component={null}>
                <CSSTransition
                  timeout={300}
                  classNames="page"
                  key={location.key}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/map" component={MapPage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </Container>
          );
        }}
      />
    </Router>
  );
}

export default App;
