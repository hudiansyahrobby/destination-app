import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AdminRoute from "./hooks/AdminRoute";
import AddCategory from "./pages/AddCategory";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const ForgetPassword = React.lazy(() => import("./pages/ForgetPassword"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const Destination = React.lazy(() => import("./pages/Destination"));
const DestinationDetail = React.lazy(() => import("./pages/DestinationDetail"));
const AddDestination = React.lazy(() => import("./pages/AddDestination"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AdminCategories = React.lazy(() => import("./pages/AdminCategories"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Suspense fallback={<Loading />}>
            <AdminRoute exact path="/admin/" component={AdminDashboard} />
            <AdminRoute
              exact
              path="/admin/categories"
              component={AdminCategories}
            />

            <AdminRoute
              path="/admin/destinations/create"
              component={AddDestination}
            />

            <AdminRoute
              path="/admin/destinations/edit:id"
              component={AddDestination}
            />

            <AdminRoute
              exact
              path="/admin/categories/create"
              component={AddCategory}
            />

            <AdminRoute
              exact
              path="/admin/categories/edit/:id"
              component={AddCategory}
            />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route path="/forget-password/:token" component={ChangePassword} />
            <Route path="/destination/:id" component={DestinationDetail} />
            <Route exact path="/destination" component={Destination} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/unauthorized" component={Unauthorized} />
            <Route path="/" exact component={Home} />
          </Suspense>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
