import { useForm } from "react-hook-form";
import { Input, Button } from "@heroui/react";
import useDataService from "../../../services/dataService";

const TeacherAddForm = ({ onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dataService = useDataService(); 

  const onSubmit = async (data) => {
    try {
      await dataService.post("/student/register", data); 
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al registrar profesor:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
      <Button type="submit" color="primary">
        Registrar Profesor
      </Button>
    </form>
  );
};

export default TeacherAddForm;
