import { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Card,
  Select,
  SelectItem,
} from "@heroui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const questionTypes = {
  text: "Texto libre",
  multiple: "Opción múltiple",
  checkbox: "Selección múltiple",
  boolean: "Verdadero/Falso",
};

const QuizEditor = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const addNewQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      type: "text",
      question: "",
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...questions];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setQuestions(reordered);
  };

  const updateQuestion = (id, key, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const exportQuiz = () => {
    const quiz = {
      title: quizTitle,
      description: quizDescription,
      questions,
    };
    console.log("JSON del Quiz:", quiz);
    alert("Quiz exportado. Ver consola.");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">Editor de Quiz</h2>
      <Input
        label="Título del Quiz"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <Textarea
        label="Descripción"
        value={quizDescription}
        onChange={(e) => setQuizDescription(e.target.value)}
      />

      <Button onPress={addNewQuestion} color="primary">
        + Añadir Pregunta
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="preguntas" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {questions.map((q, index) => (
                <Draggable key={q.id} draggableId={q.id} index={index}>
                  {(provided) => (
                    <Card
                      className="p-4 mt-4"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Select
                        label="Tipo de Pregunta"
                        selectedKeys={[q.type]}
                        onSelectionChange={(keys) =>
                          updateQuestion(q.id, "type", Array.from(keys)[0])
                        }
                      >
                        {Object.entries(questionTypes).map(([key, label]) => (
                          <SelectItem key={key}>{label}</SelectItem>
                        ))}
                      </Select>

                      <Input
                        label="Enunciado de la pregunta"
                        value={q.question}
                        onChange={(e) =>
                          updateQuestion(q.id, "question", e.target.value)
                        }
                        className="mt-4"
                      />

                      {/* Opciones solo si es multiple o checkbox */}
                      {(q.type === "multiple" || q.type === "checkbox") && (
                        <Textarea
                          label="Opciones (una por línea)"
                          placeholder="Ej: Opción 1\nOpción 2"
                          value={q.options?.join("\n") || ""}
                          onChange={(e) =>
                            updateQuestion(q.id, "options", e.target.value.split("\n"))
                          }
                          className="mt-4"
                        />
                      )}
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button color="secondary" onPress={exportQuiz}>
        Exportar Quiz
      </Button>
    </div>
  );
};

export default QuizEditor;
