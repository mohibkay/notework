import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Notebooks from "./pages/notebooks";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/notebook" component={Notebooks} />
      </Switch>
    </Router>
  );
}

export default App;
