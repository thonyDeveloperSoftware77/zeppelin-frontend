import { Routes, Route } from "react-router-dom";
import DashboardTeacher from "../../pages/Teacher/DashboardTeacher";
import Layout from "../../components/Layout";
import teacherMenu from "../../components/menus/teacherMenu";
import CourseTeacherPage from "../../pages/Teacher/CourseTeacherPage";
import CourseStudentTeacher from "../../pages/Teacher/CourseStudentsTeacherPage";
import ContentTeacherPage from "../../pages/Teacher/ContentTeacherPage";
import CourseQrTeacherPage from "../../pages/Teacher/CourseQrTeacherPage";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout routes={teacherMenu} />}>
        <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
        <Route path="/teacher/course" element={<CourseTeacherPage />} />
        <Route path="/teacher/course/:qr_code/qr" element={<CourseQrTeacherPage />} />
        <Route path="/teacher/course/:qr_code/students" element={<CourseStudentTeacher />} />
        <Route path="/teacher/course/:qr_code/view" element={<ContentTeacherPage />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
