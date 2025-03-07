import { Link } from "react-router-dom";

const TeacherMenu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/teacher/dashboard">📚 Dashboard</Link></li>
        <li><Link to="/teacher/classes">🏫 Clases</Link></li>
        <li><Link to="/teacher/students">🎓 Estudiantes</Link></li>
      </ul>
    </nav>
  );
};

export default TeacherMenu;
