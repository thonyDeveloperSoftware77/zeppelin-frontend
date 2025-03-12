import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import CourseAddForm from "../../containers/teacher/course/CourseAddForm";
import CourseView from "../../containers/teacher/course/CourseView";

const CourseTeacher = () => {
  return (
    <div>
      <PageHeader title="UNIDAD EDUCATIVA TALENTOS DE MANTA" />
      <Section>
        <h1>Cursos</h1>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
        </Card>

        <CourseAddForm />
        <CourseView />
      </Section>
    </div>
  );
};

export default CourseTeacher
