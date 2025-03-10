import { Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import AdminRoutes from "./PrivatesRoutes/AdminRoutes";
import TeacherRoutes from "./PrivatesRoutes/TeacherRoutes";
import StudentRoutes from "./PrivatesRoutes/StudentRoutes";
const PrivateRoute = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  switch (role) {
    case "org:admin":
      return <AdminRoutes />;
    case "org:teacher":
      return <TeacherRoutes />;
    case "org:student":
      return <StudentRoutes />;
    default:
      return <Navigate to="/sign-in" />;
  }
};

export default PrivateRoute;
