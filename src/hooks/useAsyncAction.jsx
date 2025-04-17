import { addToast } from "@heroui/react";

const useAsyncAction = () => {

  const execute = async (action, options = {}) => {
    const {
      successMessage = "Acción completada con éxito",
      errorMessage = "Error al realizar la acción",
      showToast = true
    } = options;

    try {
      const result = await action();
      if (showToast) {
        addToast({
          title: "Éxito",
          description: successMessage,
          color: "success"
        });
      }
      return result;
    } catch (error) {
      if (showToast) {
        addToast({
          title: "Error",
          description: errorMessage,
          color: "danger"
        });
      }
      throw error;
    }
  };

  return { execute };
};

export default useAsyncAction;