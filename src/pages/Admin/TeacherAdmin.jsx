import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import TeacherAddForm from "../../containers/admin/teacher/TeacherAddForm";
import TeacherView from "../../containers/admin/teacher/TeacherView";

const TeacherAdmin = () => {
  return (
    <div className="px-4">
      <PageHeader title="UNIDAD EDUCATIVA TALENTOS DE MANTA" />
      <Section>
        < TeacherAddForm />
        <TeacherView />
      </Section>
    </div>
  );
};

export default TeacherAdmin
