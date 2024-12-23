import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ForbiddenPage from "./ForbiddenPage";

function ProtectedRoute({ role }) {
  let userDetail = useSelector((state) => state.user.value);

  if (userDetail) {
    if (userDetail?.role === role) {
      return <Outlet />;
    } else {
      return <ForbiddenPage />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
