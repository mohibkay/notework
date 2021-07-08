import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Loader from "./components/utils/Loader";

const Home = lazy(() => import("./pages/home"));
const Notebooks = lazy(() => import("./pages/notebooks"));
const Notes = lazy(() => import("./pages/notes"));
const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/notebook" component={Notebooks} />
          <Route path="/notebook/:notebookId/:notebookName" component={Notes} />
          <Route path="/login" component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
