import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Movie from "./components/Movie";

const NotFound = () => <h1>404.. This page is not found!</h1>;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/movie/:id" component={Movie} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
