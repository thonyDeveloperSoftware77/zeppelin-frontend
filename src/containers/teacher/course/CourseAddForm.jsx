import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  useDisclosure,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalContent,
  Modal,
  addToast,
} from "@heroui/react";
import useCourses from "../../../hooks/useCourses";
import { BiSolidAddToQueue } from "react-icons/bi";

const CourseAddForm = ({ onSuccess }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(); // Agregamos onClose aquí
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { addCourse, error } = useCourses();

  const onSubmit = async (data) => {
   console.log(data);
    
    await addCourse(data);

    if (!error) {  // Solo cerrar el modal si no hubo error
      reset();
      onClose(); // 🔥 Cierra el modal al éxito
      if (onSuccess) onSuccess();
      
      addToast({
        title: "Curso Registrado",
        description: "El curso se ha registrado con éxito.",
        color: "success",
      });
    } else {
      addToast({
        title: "Curso no Registrado",
        description: error,
        color: "danger",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-lg font-bold">Cursos</h1>
        <Button className="max-w-fit" color="default" onPress={onOpen}>
          Añadir Nuevo <BiSolidAddToQueue size={35} />
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1">Registro de Cursos</ModalHeader>
            <ModalBody>
              <Input
                label="Título"
                {...register("title", { required: "El título es obligatorio" })}
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
              />
              <Input
                label="Fecha de Inicio"
                type="date"
                {...register("start_date", { required: "La fecha es obligatoria" })}
                isInvalid={!!errors.start_date}
                errorMessage={errors.start_date?.message}
              />
              <Input
                label="Descripción"
                {...register("description")}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Cerrar</Button>
              <Button color="primary" type="submit">Registrar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseAddForm;
