import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import CourseAddForm from "../../containers/teacher/course/CourseAddForm";
import CourseView from "../../containers/teacher/course/CourseView";

const CourseTeacher = () => {
  return (
    <div>
      <PageHeader title="Curso" />
      <Section>
        <CourseAddForm />
        <CourseView />
      </Section>
    </div>
  );
};

export default CourseTeacher
