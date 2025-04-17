import useTeacherStore from "../../src/store/teacherStore";

afterEach(() => {
  // Limpiamos el estado después de cada test
  useTeacherStore.setState({
    teachers: [],
    loading: false,
    error: null,
  });
});

test('fetchTeachers carga la lista de profesores correctamente', async () => {
  const mockDataService = {
    get: async () => [
      { id: 1, name: "Profe Uno", email: "uno@clase.com" },
      { id: 2, name: "Profe Dos", email: "dos@clase.com" },
    ],
  };

  await useTeacherStore.getState().fetchTeachers(mockDataService);

  const { teachers, loading, error } = useTeacherStore.getState();
  expect(loading).toBe(false);
  expect(error).toBe(null);
  expect(teachers).toHaveLength(2);
  expect(teachers[0].name).toBe("Profe Uno");
});

test('fetchTeachers maneja errores correctamente', async () => {
  const mockDataService = {
    get: async () => {
      throw new Error("No se pudo obtener la lista de profesores");
    },
  };

  await useTeacherStore.getState().fetchTeachers(mockDataService);

  const { error, teachers } = useTeacherStore.getState();
  expect(error).toBe("No se pudo obtener la lista de profesores");
  expect(teachers).toEqual([]);
});

test('addTeacher agrega un nuevo profesor a la lista', async () => {
  const newTeacher = {
    name: "Nuevo Profe",
    email: "nuevo@clase.com",
  };

  const mockDataService = {
    post: async (url, body) => {
      expect(url).toBe("/teacher/register");
      expect(body).toEqual(newTeacher);
      return { id: 3, ...newTeacher };
    },
  };

  await useTeacherStore.getState().addTeacher(mockDataService, newTeacher);

  const { teachers } = useTeacherStore.getState();
  expect(teachers).toHaveLength(1);
  expect(teachers[0].name).toBe("Nuevo Profe");
});

test('removeTeacher elimina un profesor del estado', async () => {
  // Simulamos estado inicial
  useTeacherStore.setState({
    teachers: [
      { id: 1, name: "Profe 1" },
      { id: 2, name: "Profe 2" },
    ],
    loading: false,
    error: null,
  });

  const mockDataService = {
    delete: async (url) => {
      expect(url).toBe("/teachers/1");
    },
  };

  await useTeacherStore.getState().removeTeacher(mockDataService, 1);

  const { teachers } = useTeacherStore.getState();
  expect(teachers).toHaveLength(1);
  expect(teachers[0].id).toBe(2);
});
