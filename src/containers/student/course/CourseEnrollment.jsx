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
import { BiSolidAddToQueue } from "react-icons/bi";
import useAssignments from "../../../hooks/useAssigments";

const CourseEnrollment = ({ onSuccess }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { assignToCourse, error } = useAssignments(); // ← usamos assignToCourse

  const onSubmit = async (data) => {
    try {
      await assignToCourse(data.qr_code);

      reset();
      onClose();
      if (onSuccess) onSuccess();

      addToast({
        title: "Inscripción exitosa",
        description: "Te has inscrito al curso correctamente.",
        color: "success",
      });
    } catch (e) {
      console.error(e); // opcional
      addToast({
        title: "Error al inscribirse",
        description: e.message || "Algo salió mal.",
        color: "danger",
      });
    }
  };

  
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-lg font-bold"></h1>
        <Button className="max-w-fit" color="default" onPress={onOpen}>
          Inscribirse <BiSolidAddToQueue size={35} />
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1">Inscribirse a un nuevo Curso</ModalHeader>
            <ModalBody>
              <Input
                label="Código de Curso"
                {...register("qr_code", { required: "El código es obligatorio" })}
                isInvalid={!!errors.qr_code}
                errorMessage={errors.qr_code?.message}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Cerrar</Button>
              <Button color="primary" type="submit">Inscribirse</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseEnrollment;
