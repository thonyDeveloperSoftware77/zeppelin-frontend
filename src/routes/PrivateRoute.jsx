import { Navigate, useLocation } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import AdminRoutes from "./PrivatesRoutes/AdminRoutes";
import TeacherRoutes from "./PrivatesRoutes/TeacherRoutes";
import StudentRoutes from "./PrivatesRoutes/StudentRoutes";

const PrivateRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const location = useLocation(); // Obtener la ubicación actual

  if (!isLoaded) return <div>Cargando...</div>; // Esperamos que se cargue Clerk

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  const role = user?.publicMetadata?.role;

  console.log("Usuario autenticado con rol:", role);
  console.log("Intentando acceder a:", location.pathname);

  if (!role) {
    return <div>No tienes un rol asignado. Contacta con el administrador.</div>;
  }

  // Definir rutas permitidas para cada rol
  const roleRoutes = {
    "org:admin": "/admin",
    "org:teacher": "/teacher",
    "org:student": "/student",
  };

  // Verificar si la ruta actual es válida para el rol del usuario
  const allowedRoute = roleRoutes[role];
  if (!location.pathname.startsWith(allowedRoute)) {
    console.log("Acceso denegado. Redirigiendo...");
    return <Navigate to={allowedRoute + "/dashboard"} replace />;
  }

  // Renderizar el grupo de rutas correcto
  switch (role) {
    case "org:admin":
      return <AdminRoutes />;
    case "org:teacher":
      return <TeacherRoutes />;
    case "org:student":
      return <StudentRoutes />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default PrivateRoute;
