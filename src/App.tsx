import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Loader from "./components/utils/Loader";

const Home = lazy(() => import("./pages/home"));
const Notebooks = lazy(() => import("./pages/notebooks"));
const Notes = lazy(() => import("./pages/notes"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/notebook" component={Notebooks} />
          <Route path="/notebook/:notebookId/:notebookName" component={Notes} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
