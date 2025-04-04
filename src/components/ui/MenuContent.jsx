import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import useCourseContent from "../../hooks/useCourseContent";

const MenuContent = ({ course_id }) => {
  const {
    course_content,
    loading,
    addModule,
    addSection,
  } = useCourseContent(course_id);

  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");

  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [sectionType, setSectionType] = useState("text");
  const [selectedModuleName, setSelectedModuleName] = useState(null);

  const handleAddModule = () => {
    if (newModuleName.trim()) {
      addModule(newModuleName.trim());
      setNewModuleName("");
      setModuleModalOpen(false);
    }
  };

  const handleAddSection = () => {
    if (selectedModuleName) {
      addSection(selectedModuleName, sectionType);
      setSectionModalOpen(false);
    }
  };

  // Agrupar por módulo
  const modulesMap = {};
  course_content.forEach((item) => {
    if (!modulesMap[item.module]) {
      modulesMap[item.module] = [];
    }
    modulesMap[item.module].push(item);
  });

  // Ordenar secciones por index
  Object.values(modulesMap).forEach((sections) =>
    sections.sort((a, b) => a.section_index - b.section_index)
  );

  const sectionTypeMap = {
    text: "Texto",
    video: "Video",
    quiz: "Quiz",
  };

  return (
    <div className="p-2 w-full max-w-[300px]">
      <Button onPress={() => setModuleModalOpen(true)} className="mb-4" color="primary">
        + Agregar Módulo
      </Button>

      <Accordion>
        {Object.entries(modulesMap).map(([moduleName, sections]) => (
          <AccordionItem
            key={moduleName}
            title={moduleName}
            startContent={<FiFileText />}
          >
            <ul className="pl-4">
              {sections.map((section) => (
                <li key={section.course_content_id} className="py-1 text-sm">
                  Sección {section.section_index + 1} —{" "}
                  {sectionTypeMap[section.content_type]}
                </li>
              ))}
            </ul>
            <Button
              onPress={() => {
                setSelectedModuleName(moduleName);
                setSectionModalOpen(true);
              }}
              className="mt-2"
              size="sm"
              color="secondary"
            >
              + Agregar Sección
            </Button>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Modal para crear módulo */}
      <Modal isOpen={moduleModalOpen} onOpenChange={setModuleModalOpen}>
        <ModalContent>
          <ModalHeader>Nuevo Módulo</ModalHeader>
          <ModalBody>
            <Input
              label="Nombre del módulo"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setModuleModalOpen(false)}>
              Cancelar
            </Button>
            <Button onPress={handleAddModule} color="primary">
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para crear sección */}
      <Modal isOpen={sectionModalOpen} onOpenChange={setSectionModalOpen}>
        <ModalContent>
          <ModalHeader>Nueva Sección</ModalHeader>
          <ModalBody>
            <Select
              label="Tipo de contenido"
              selectedKeys={[sectionType]}
              onSelectionChange={(keys) => setSectionType(Array.from(keys)[0])}
            >
              {Object.entries(sectionTypeMap).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setSectionModalOpen(false)}>
              Cancelar
            </Button>
            <Button onPress={handleAddSection} color="secondary">
              Crear Sección
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MenuContent;
