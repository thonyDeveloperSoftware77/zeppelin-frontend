
import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../../pages/Admin/DashboardAdmin";
import Layout from "../../components/Layout";
import adminMenu from "../../components/menus/adminMenu";
import TeacherAdmin from "../../pages/Admin/TeacherAdmin";
import StudentAdmin from "../../pages/Admin/StudentAdmin";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout routes={adminMenu} />}>
                <Route index element={<TeacherAdmin />} />
                <Route path="admin/dashboard" element={<DashboardAdmin />} />
                <Route path="admin/teachers" element={<TeacherAdmin />} />
                <Route path="admin/students" element={<StudentAdmin />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
