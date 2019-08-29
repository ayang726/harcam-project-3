import React, { Component } from "react";
import "./App.css";
import WordCloudGenerator from "./components/WCG/WCG"
import WordCloudDisplay from "./components/WCDisplay/WCDisplay"
import Welcome from "./components/Welcome/Welcome"
import Navbar from "./components/Navbar/Navbar"
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./js/react-auth0-wrapper";


function App() {

  const { isAuthenticated, loading } = useAuth0();
  console.log(isAuthenticated);

  console.log(loading);

  if (loading) {
    return (
      <div>App Loading...</div>
    );
  }

  return (
    <Router>
      <div className="App container">
        <div className="row">
          <div className="col-lg-12">
            <Navbar />
          </div>
        </div>
        <Switch>
          {!isAuthenticated &&
            <Route exact path="/" component={Welcome} />
          }
          {isAuthenticated &&
            <Route exact path="/" component={WordCloudGenerator} />
          }

          <PrivateRoute path="/build" component={WordCloudGenerator} />
          <PrivateRoute path="/wordCloud" component={WordCloudDisplay} />
          {/* <Route exact path="/build" component={WordCloudGenerator} />
          <Route exact path="/wordCloud" component={WordCloudDisplay} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
