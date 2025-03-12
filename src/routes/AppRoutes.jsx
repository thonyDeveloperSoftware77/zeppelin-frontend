import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import SignInPage from "../pages/SignInPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isLoaded || !isUserLoaded) return <div>Cargando App...</div>;

  // 🔥 Separar la lógica de autenticación y permitir que /sign-in se renderice
  if (!isSignedIn) {
    console.log("Redirigiendo a Sign-In");
    return (
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    );
  }

  // 🔹 Verificar si el usuario tiene rol
  const role = user?.publicMetadata?.role;
  if (!role) {
    return <div>No tienes un rol asignado. Contacta con el administrador.</div>;
  }

  let redirectPath = "/";
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
      <Route path="/*" element={<PrivateRoute />} />
    </Routes>
  );
};

export default AppRoutes;
