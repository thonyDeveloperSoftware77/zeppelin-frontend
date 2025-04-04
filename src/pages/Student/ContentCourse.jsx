import React from "react";
import PageHeader from "../../components/ui/PageHeader";
import useWebSocket from "../../hooks/useWebSockets";
import { useParams } from "react-router-dom";
import useAssignments from "../../hooks/useAssigments";
import Section from "../../components/ui/Section";

const ContentCourse = () => {
  const { qr_code } = useParams();
  const { assignments } = useAssignments("student");

  const course = assignments.find((c) => c.qr_code === qr_code);

  const { sendMessage } = useWebSocket((data) => {
    console.log("📩 Mensaje recibido del WebSocket:", data);
  });

  return (
    <div>
      <PageHeader title={course.title || ""} />
      <Section>
        <button onClick={() => sendMessage("Hola desde React!")}>
          Enviar mensaje al servidor
        </button>
      </Section>

    </div>
  );
};

export default ContentCourse;
