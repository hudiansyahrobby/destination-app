import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }: any) => {
  const user = localStorage.getItem("user");
  let isAdmin = false;
  if (user) {
    const _user = JSON.parse(user);
    isAdmin = _user.isAdmin;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAdmin) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/unauthorized",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default AdminRoute;
