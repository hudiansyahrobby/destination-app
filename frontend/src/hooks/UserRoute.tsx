import { Redirect, Route } from "react-router-dom";

const UserRoute = ({ component: Component, ...rest }: any) => {
  const user = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
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

export default UserRoute;
