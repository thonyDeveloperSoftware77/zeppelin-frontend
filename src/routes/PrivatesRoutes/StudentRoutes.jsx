import { Routes, Route } from "react-router-dom";
import DashboardStudent from "../../pages/Student/DashboardStudent";
import Layout from "../../components/Layout";
import studentMenu from "../../components/menus/studentMenu";
import CourseStudent from "../../pages/Student/CourseStudent";
import ContentCourse from "../../pages/Student/ContentCourse";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout routes={studentMenu} />}>
        <Route path="/student/dashboard" element={<DashboardStudent />} />
        <Route path="/student/course" element={<CourseStudent />} />
        <Route path="/student/course/:qr_code/view" element={<ContentCourse />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
