import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading";

const Home = React.lazy(() => import("./pages/Home"));

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/" exact component={Home} />
        </Suspense>
      </Switch>
    </Router>
  );
};
export default App;
