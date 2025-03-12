import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import StudentAddForm from "../../containers/admin/student/StudentAddForm";
import StudentView from "../../containers/admin/student/StudentView";

const StudentAdmin = () => {
  return (
    <div className="px-4">
      <PageHeader title="UNIDAD EDUCATIVA TALENTOS DE MANTA" />
      <Section>
        <StudentAddForm />
        <StudentView />
      </Section>
    </div>
  );
};

export default StudentAdmin
