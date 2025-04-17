import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import MenuContent from "../../components/ui/MenuContent";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import useCourses from "../../hooks/useCourses";
import QuizEditor from "../../components/quiz/QuizEditor";
import CardContainer from "../../components/ui/CardContainer";
import useCourseContent from "../../hooks/useCourseContent";

const ContentTeacherPage = () => {
  const { courses } = useCourses();
  const { qr_code } = useParams();
  const course = courses.find((course) => course.qr_code === qr_code);
  const { course_content, loading, error} = useCourseContent(course?.id);
  const [selectedSection, setSelectedSection] = useState(null);


  if (!course) {
    return <p className="text-center text-red-500 font-bold">Curso no encontrado</p>;
  }

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  const renderContentEditor = () => {
    if (!selectedSection) {
      return <p className="text-center text-gray-500">Selecciona una sección para editar</p>;
    }

    return (
      <div className="space-y-4">
        {/* Mostrar el título de la sección */}

        {selectedSection.content_type === "text" && (
          <CardContainer>
            <Editor
              key={selectedSection.content_id} // Asegura que el componente se recree
              contentId={selectedSection.content_id}
              courseId={course?.id}
              title={selectedSection.Details?.title}
              jsonContent={selectedSection.Details?.json_content}
            />
          </CardContainer>
        )}
        {selectedSection.content_type === "quiz" && (
          <QuizEditor contentId={selectedSection.content_id} />
        )}
        {selectedSection.content_type === "video" && (
          <p className="text-center text-gray-500">Editor de video no disponible aún</p>
        )}
      </div>
    );
  };

  return (
    <div className="px-2">
      <PageHeader onBack={true} title={course?.title || ""} />
      <Section>
        <div className="flex w-full">
          <div className="w-1/4 py-4">
            <MenuContent
              course_id={course?.id}
              course_content={course_content}
              loading={loading}
              error={error}
              onSectionSelect={handleSectionSelect}
            />
          </div>
          <div className="w-3/4">{renderContentEditor()}</div>
        </div>
      </Section>
    </div>
  );
};

export default ContentTeacherPage;