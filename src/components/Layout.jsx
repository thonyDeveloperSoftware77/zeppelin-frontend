import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = ({ routes = [] }) => { 
  return (
    <div className="layout">
      <Sidebar routes={routes} />
      <main className="layout__content">
        <Outlet /> {/* Renderiza rutas anidadas */}
      </main>
    </div>
  );
};

export default Layout;
