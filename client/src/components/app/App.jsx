import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Registration from "../registration/Registration";
import "./app.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Switch>
            <Route path="/registration" component={Registration} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
