import { Link } from "react-router-dom";

const StudentMenu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/student/dashboard">🎒 Dashboard</Link></li>
        <li><Link to="/student/courses">📖 Cursos</Link></li>
        <li><Link to="/student/profile">👤 Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default StudentMenu;
