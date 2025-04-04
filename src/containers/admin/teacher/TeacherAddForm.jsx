import { useForm } from "react-hook-form";
import { Input, Button, useDisclosure, ModalFooter, ModalHeader, ModalBody, ModalContent, Modal, addToast, ToastProvider } from "@heroui/react";
import useTeachers from "../../../hooks/useTeachers";
import { BiSolidAddToQueue } from "react-icons/bi";

const TeacherAddForm = ({ onSuccess }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { addTeacher, error } = useTeachers();
  const onSubmit = async (data) => {
   console.log(data)
    await addTeacher(data);
    if (onSuccess) {
      onSuccess();
      reset();
    }

    addToast({
      title: "Profesor no Registrado",
      description: error,
      color: "danger"
    })
   console.log(error)
  };

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-lg font-bold">Profesores</h1>
        <Button className="max-w-fit" color="default" onPress={onOpen}>
          Añadir Nuevo <BiSolidAddToQueue size={35} />
        </Button>
      </div>


      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

              <ModalHeader className="flex flex-col gap-1">Registro de Profesores</ModalHeader>
              <ModalBody>
                <Input
                  label="Nombre"
                  {...register("name", { required: "El nombre es obligatorio" })}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
                <Input
                  label="Apellido"
                  {...register("lastname", { required: "El apellido es obligatorio" })}
                  isInvalid={!!errors.lastname}
                  errorMessage={errors.lastname?.message}
                />
                <Input
                  label="Correo"
                  type="email"
                  {...register("email", { required: "El correo es obligatorio" })}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" type="submit" >
                  Registrar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>

  );
};

export default TeacherAddForm;
