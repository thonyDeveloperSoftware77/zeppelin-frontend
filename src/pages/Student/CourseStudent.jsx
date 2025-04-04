import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import CourseEnrollment from "../../containers/student/course/CourseEnrollment";
import StudentAssigmentView from "../../containers/student/course/StudentAssigmentView";

const CourseStudent = () => {
  return (
    <div>
      <PageHeader title="Cursos" />
      <Section>
        <CourseEnrollment />
        <StudentAssigmentView/>
      </Section>
    </div>
  );
};

export default CourseStudent
