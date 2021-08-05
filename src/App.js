import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./CreateConsultantComponents/Home/Home";
import HomePage from "./HomePage";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";

class App extends React.Component {
  render() {
   console.log = console.warn = console.error = () => {};
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/consultant" component={Home}></Route>
            {/* Home Page component */}
            <Route path="/" component={HomePage}></Route>
            {/* create consultant Home component */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
