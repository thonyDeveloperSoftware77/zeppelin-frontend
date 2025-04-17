import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  addToast,
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { FiEdit, FiEye, FiEyeOff, FiFileText, FiPlus } from "react-icons/fi";
import useCourseContent from "../../hooks/useCourseContent";

const MenuContent = ({ course_id, course_content, error, onSectionSelect }) => {
  const {
    addNewVideoSection,
    addNewQuizSection,
    addNewTextSection,
    addVideoSection,
    addQuizSection,
    addTextSection,
    toggleContentStatus,
    updateModuleTitle, // Assuming this function exists in the hook
  } = useCourseContent(course_id);

  const [newModuleModalOpen, setNewModuleModalOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [editModuleModalOpen, setEditModuleModalOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [sectionType, setSectionType] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [formError, setFormError] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [editedModuleName, setEditedModuleName] = useState("");
  const [currentModule, setCurrentModule] = useState("");

  const sectionTypeMap = {
    video: "Video",
    quiz: "Quiz",
    text: "Texto",
  };

  const modulesMap = (Array.isArray(course_content) ? course_content : []).reduce(
    (acc, item) => {
      if (!acc[item.module]) {
        acc[item.module] = [];
      }
      acc[item.module].push(item);
      return acc;
    },
    {}
  );

  Object.values(modulesMap).forEach((sections) =>
    sections.sort((a, b) => a.section_index - b.section_index)
  );

  const handleSectionClick = (section) => {
    setSelectedSectionId(section.course_content_id);
    onSectionSelect(section);
  };

  const handleCreateNewModule = async () => {
    if (!moduleName.trim()) {
      setFormError("El nombre del módulo es requerido");
      return;
    }
    if (!sectionType) {
      setFormError("Debes seleccionar un tipo de sección");
      return;
    }

    try {
      setFormError(null);
      if (sectionType === "video") {
        if (!videoUrl.trim()) {
          setFormError("La URL del video es requerida");
          return;
        }
        await addNewVideoSection(moduleName, videoUrl, videoTitle, videoDescription);
      } else if (sectionType === "quiz") {
        await addNewQuizSection(moduleName, quizTitle, quizDescription);
      } else if (sectionType === "text") {
        await addNewTextSection(moduleName, textTitle);
      }
      addToast({
        title: "Módulo Creado",
        description: "El Módulo ha sido ingresado con éxito",
        color: "success",
      });
      resetForm();
      setNewModuleModalOpen(false);
    } catch (err) {
      addToast({
        title: "Error al crear el Módulo",
        description: "El Módulo no se ha creado",
        color: "danger",
      });
      setFormError(err.message || "Error al crear el módulo");
    }
  };

  const handleAddSection = async () => {
    if (!sectionType) {
      setFormError("Debes seleccionar un tipo de sección");
      return;
    }

    try {
      setFormError(null);
      if (sectionType === "video") {
        if (!videoUrl.trim()) {
          setFormError("La URL del video es requerida");
          return;
        }
        await addVideoSection(selectedModule, videoUrl, videoTitle, videoDescription);
      } else if (sectionType === "quiz") {
        await addQuizSection(selectedModule, quizTitle, quizDescription);
      } else if (sectionType === "text") {
        await addTextSection(selectedModule, textTitle);
      }
      resetForm();
      setSectionModalOpen(false);
    } catch (err) {
      setFormError(err.message || "Error al crear la sección");
    }
  };

  const handleChangeVisibility = async (section) => {
    try {
      await toggleContentStatus(section.content_id, !section.is_active);
      addToast({
        title: "Actualizado",
        description: "Contenido ocultado Correctamente",
        color: "success",
      });
    } catch (err) {
      addToast({
        title: "Error",
        description: "Error al ocultar",
        color: "danger",
      });
    }
  };

  const handleEditModule = (moduleName) => {
    setCurrentModule(moduleName);
    setEditedModuleName(moduleName);
    setEditModuleModalOpen(true);
  };

  const handleUpdateModuleTitle = async () => {
    if (!editedModuleName.trim()) {
      setFormError("El nombre del módulo no puede estar vacío");
      return;
    }

    try {
      const moduleSections = modulesMap[currentModule];
      const courseContentId = moduleSections[0]?.course_content_id; // Assuming first section has the module's course_content_id
      await updateModuleTitle(courseContentId, editedModuleName);
      addToast({
        title: "Módulo actualizado",
        description: `El módulo ${currentModule} ha sido actualizado exitosamente.`,
        color: "success",
      });
      setEditModuleModalOpen(false);
      resetForm();
    } catch (err) {
      setFormError(err.message || "Error al actualizar el módulo");
    }
  };

  const resetForm = () => {
    setModuleName("");
    setSelectedModule("");
    setSectionType("");
    setVideoUrl("");
    setVideoTitle("");
    setVideoDescription("");
    setQuizTitle("");
    setQuizDescription("");
    setTextTitle("");
    setFormError(null);
    setEditedModuleName("");
    setCurrentModule("");
  };

  return (
    <div className="p-4 w-full max-w-[320px] bg-gray-50 rounded-lg shadow-sm">
      <Button
        onPress={() => setNewModuleModalOpen(true)}
        className="mb-6 w-full"
        color="primary"
        startContent={<FiPlus />}
      >
        Agregar Módulo
      </Button>

      {error && (
        <Card className="p-4 mb-4 bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </Card>
      )}

      {!error && (
        <Accordion variant="splitted" className="space-y-2" selectionMode="single">
          {Object.entries(modulesMap).map(([moduleName, sections]) => (
            <AccordionItem
              key={moduleName}
              title={
                <div className="flex items-center group">
                  <span className="text-base font-semibold text-gray-800">
                    {moduleName}
                  </span>
                  <Button
                    size="sm"
                    variant="light"
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onPress={() => handleEditModule(moduleName)}
                  >
                    <FiEdit className="text-gray-600" />
                  </Button>
                </div>
              }
              startContent={<FiFileText className="text-gray-500 text-lg" />}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <ul className="pl-2 pb-2">
                {sections.map((section) => (
                  <li
                    key={section.course_content_id}
                    className={`py-2 px-3 text-sm rounded-md cursor-pointer transition-colors flex justify-between items-center group ${
                      selectedSectionId === section.course_content_id
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex-1" onClick={() => handleSectionClick(section)}>
                      {section.section_index + 1} -{" "}
                      {section.Details?.title || sectionTypeMap[section.content_type]}
                    </div>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="opacity-100 transition-opacity"
                      onPress={() => handleChangeVisibility(section)}
                    >
                      {section.is_active ? (
                        <FiEye className="text-green-600" />
                      ) : (
                        <FiEyeOff className="text-red-600" />
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
              <Button
                onPress={() => {
                  setSelectedModule(moduleName);
                  setSectionModalOpen(true);
                }}
                className="mt-2 w-full"
                size="sm"
                color="secondary"
                variant="flat"
                startContent={<FiPlus />}
              >
                Agregar Sección
              </Button>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Modal isOpen={newModuleModalOpen} onOpenChange={setNewModuleModalOpen}>
        <ModalContent>
          <ModalHeader>Agregar Nuevo Módulo</ModalHeader>
          <ModalBody>
            <Input
              label="Nombre del módulo"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              isRequired
              placeholder="Ej: Introducción"
            />
            <Select
              label="Tipo de sección"
              selectedKeys={sectionType ? [sectionType] : []}
              onSelectionChange={(keys) => setSectionType(Array.from(keys)[0] || "")}
              isRequired
            >
              {Object.entries(sectionTypeMap).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </Select>

            {sectionType === "video" && (
              <>
                <Input
                  label="URL del video"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  isRequired
                  placeholder="https://..."
                />
                <Input
                  label="Título del video"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Ej: Introducción al curso"
                />
                <Textarea
                  label="Descripción"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Descripción del video"
                />
              </>
            )}

            {sectionType === "quiz" && (
              <>
                <Input
                  label="Título del quiz"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Ej: Evaluación inicial"
                />
                <Textarea
                  label="Descripción"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Descripción del quiz"
                />
              </>
            )}

            {sectionType === "text" && (
              <Input
                label="Título del texto"
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
                placeholder="Ej: Resumen del módulo"
              />
            )}

            {formError && <p className="text-red-500">{formError}</p>}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setNewModuleModalOpen(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button color="primary" onPress={handleCreateNewModule}>
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={sectionModalOpen} onOpenChange={setSectionModalOpen}>
        <ModalContent>
          <ModalHeader>Agregar Nueva Sección</ModalHeader>
          <ModalBody>
            <Select
              label="Tipo de sección"
              selectedKeys={sectionType ? [sectionType] : []}
              onSelectionChange={(keys) => setSectionType(Array.from(keys)[0] || "")}
              isRequired
            >
              {Object.entries(sectionTypeMap).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </Select>

            {sectionType === "video" && (
              <>
                <Input
                  label="URL del video"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  isRequired
                  placeholder="https://..."
                />
                <Input
                  label="Título del video"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Ej: Introducción al curso"
                />
                <Textarea
                  label="Descripción"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Descripción del video"
                />
              </>
            )}

            {sectionType === "quiz" && (
              <>
                <Input
                  label="Título del quiz"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Ej: Evaluación inicial"
                />
                <Textarea
                  label="Descripción"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Descripción del quiz"
                />
              </>
            )}

            {sectionType === "text" && (
              <Input
                label="Título del texto"
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
                placeholder="Ej: Resumen del módulo"
              />
            )}

            {formError && <p className="text-red-500">{formError}</p>}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setSectionModalOpen(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button color="primary" onPress={handleAddSection}>
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={editModuleModalOpen} onOpenChange={setEditModuleModalOpen}>
        <ModalContent>
          <ModalHeader>Editar Módulo</ModalHeader>
          <ModalBody>
            <Input
              label="Nombre del módulo"
              value={editedModuleName}
              onChange={(e) => setEditedModuleName(e.target.value)}
              isRequired
              placeholder="Ej: Introducción"
            />
            {formError && <p className="text-red-500">{formError}</p>}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setEditModuleModalOpen(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button color="primary" onPress={handleUpdateModuleTitle}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MenuContent;