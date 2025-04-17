


import React from "react";
import { useParams } from "react-router-dom";
import useCourses from "../../hooks/useCourses";
import QRCode from "react-qr-code";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";

const CourseQrTeacherPage = () => {
  const { courses } = useCourses();
  const { qr_code } = useParams(); // Obtiene el ID del curso desde la URL
  const course = courses.find((course) => course.qr_code === qr_code); // Busca el curso

  if (!course) {
    return <p className="text-center text-red-500 font-bold">Curso no encontrado</p>;
  }

  return (
    <div>
      <PageHeader title="Curso>Qr" onBack={true} />
      <Section>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">{course.title}</h2>
          <h2 className="text-xl font-bold mb-4">{course.qr_code}</h2>
          <QRCode value={course.qr_code} size={500} />
        </div>
      </Section>
    </div>
  );
};

export default CourseQrTeacherPage;
