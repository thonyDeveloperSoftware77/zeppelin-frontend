import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import SignInPage from "../pages/SignInPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignInPage />} />

      {/* 🔐 Rutas Protegidas */}
      <Route path="/*" element={<PrivateRoute />} />
    </Routes>
  );
};

export default AppRoutes;
