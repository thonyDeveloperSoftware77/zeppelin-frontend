import { BiHomeAlt, BiUser } from "react-icons/bi";

const adminMenu = [
    { path: "/admin/dashboard", name: "Home", icon: <BiHomeAlt size={22} /> },
    { path: "/admin/teachers", name: "Profesores", icon: <BiUser size={22} /> },
    { path: "/admin/reports", name: "Reportes", icon: "📄" },
  ];
  
  export default adminMenu;
  