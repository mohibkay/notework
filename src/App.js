import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Notebooks from "./pages/notebooks";
import Notes from "./pages/notes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/notebook" component={Notebooks} />
        <Route path="/notebook/:notebookId/:notebookName" component={Notes} />
      </Switch>
    </Router>
  );
}

export default App;
