import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import SignInPage from "../pages/SignInPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isLoaded || !isUserLoaded) return <div>Cargando App...</div>;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  const role = user?.publicMetadata?.role;
  if (!role) {
    return <div>No tienes un rol asignado. Contacta con el administrador.</div>;
  }

  let redirectPath = "/sign-in";
  switch (role) {
    case "org:admin":
      redirectPath = "/admin/dashboard";
      break;
    case "org:teacher":
      redirectPath = "/teacher/dashboard";
      break;
    case "org:student":
      redirectPath = "/student/dashboard";
      break;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={redirectPath} replace />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/*" element={<PrivateRoute />} />
    </Routes>
  );
};

export default AppRoutes;
