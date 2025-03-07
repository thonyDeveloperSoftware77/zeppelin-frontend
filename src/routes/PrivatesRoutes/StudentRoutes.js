import { Routes, Route } from "react-router-dom";
import DashboardStudent from "../../pages/Student/DashboardStudent";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/student/dashboard" element={<DashboardStudent />} />
    </Routes>
  );
};

export default StudentRoutes;
