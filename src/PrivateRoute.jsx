import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/useAuth";

function PrivateRoute({ children }) {
  const { authStatus } = useAuth();

  if (authStatus !== "loggedIn") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
