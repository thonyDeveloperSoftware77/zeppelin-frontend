import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import TeacherAddForm from "../../containers/admin/teacher/TeacherAddForm";

const TeacherAdmin = () => {
  return (
    <div className="px-4">
      <PageHeader title="Profesores" />
      <Section>
        <h1>TeacherAdmin 🔐 (Solo usuarios autenticados)</h1>
        < TeacherAddForm />
      </Section>
    </div>
  );
};

export default TeacherAdmin
