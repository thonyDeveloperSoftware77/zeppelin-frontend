import { Routes, Route } from "react-router-dom";
import DashboardTeacher from "../../pages/Teacher/DashboardTeacher";
import Layout from "../../components/Layout";
import teacherMenu from "../../components/menus/TeacherMenu";
import CourseTeacher from "../../pages/Teacher/CourseTeacher";
import ContentTeacher from "../../pages/Teacher/ContentTeacher";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout routes={teacherMenu} />}>
        <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
        <Route path="/teacher/course" element={<CourseTeacher />} />
        <Route path="/teacher/content" element={<ContentTeacher />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
