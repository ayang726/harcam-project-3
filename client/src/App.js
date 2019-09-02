import React, { Component, useState, useEffect } from "react";
import "./App.css";
import WordCloudGenerator from "./components/WCG/WCG"
import WordCloudDisplay from "./components/WCDisplay/WCDisplay"
import Welcome from "./components/Welcome/Welcome"
import Navbar from "./components/Navbar/Navbar"
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "./js/react-auth0-wrapper";
import API from './js/API';



function App() {

  const { isAuthenticated, loading, user } = useAuth0();
  const [currentWC, setCurrentWC] = useState();
  const [currentWCID, setCurrentWCID] = useState();
  const [wcList, setWcList] = useState([]);

  let userSub = "";
  let userId = "";
  if (isAuthenticated === true && user) {
    userSub = user.sub
    userId = userSub.substring(userSub.indexOf("|") + 1)
  }

  const loadWcList = (selectedId, fn) => {
    API.getWordClouds(userId)
      .then(response => {
        // console.log(response.data.length > 0);
        if (response.data.length > 0) {
          setWcList(response.data)
          let selectedWC
          if (selectedId)
            selectedWC = response.data.filter(wc => wc._id === selectedId)[0]
          if (!selectedWC)
            selectedWC = response.data[response.data.length - 1];
          // console.log(response.data);

          setCurrentWC(selectedWC.title)
          setCurrentWCID(selectedWC._id)

          // console.log(selectedWC.title);
          // console.log(selectedWC);
        }
        if (fn)
          fn();
      })
      .catch(e => { console.log(e) })
  }

  useEffect(() => {
    if (userId) {
      // console.log('called');

      // loadWcList();
    }
  }, [userId]);


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
            <Navbar
              userId={userId}
              currentWC={currentWC}
              currentWCID={currentWCID}
              setCurrentWC={setCurrentWC}
              setCurrentWCID={setCurrentWCID}
              wcList={wcList}
              loadWcList={loadWcList}
            />
          </div>
        </div>
        <Switch>
          <Route exact path="/" render={() => {
            if (isAuthenticated === false)
              return <Welcome />
            else
              return <Redirect to="/build" />
          }} />
          {/* <Route exact path="/" component={Welcome} /> */}
          <PrivateRoute
            path="/build"
            render={(props) => <WordCloudGenerator {...props}
              userId={userId}
              currentWC={currentWC}
              currentWCID={currentWCID}
              setCurrentWC={setCurrentWC}
              setCurrentWCID={setCurrentWCID}
              loadWcList={loadWcList}
            />}
          />
          <PrivateRoute
            path="/wordCloud"
            render={(props) => <WordCloudDisplay
              currentWCID={currentWCID}
              loadWcList={loadWcList}
            />}
          />
          {/* <Route exact path="/build" component={WordCloudGenerator} />
          <Route exact path="/wordCloud" component={WordCloudDisplay} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
