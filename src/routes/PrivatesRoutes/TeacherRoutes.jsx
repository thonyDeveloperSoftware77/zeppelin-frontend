import { Routes, Route } from "react-router-dom";
import DashboardTeacher from "../../pages/Teacher/DashboardTeacher";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
    </Routes>
  );
};

export default TeacherRoutes;
