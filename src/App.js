import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import addProject from "./components/Project/addProject";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/addProject" component={addProject} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
