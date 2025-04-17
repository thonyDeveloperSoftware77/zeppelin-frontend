import useStudentStore from "../../src/store/studentStore";

afterEach(() => {
  // Limpiamos el estado entre tests
  useStudentStore.setState({
    students: [],
    loading: false,
    error: null,
  });
});

test('fetchStudents carga correctamente', async () => {
  const mockDataService = {
    get: async () => [
      { id: 1, name: "Estudiante Uno", email: "uno@test.com" },
      { id: 2, name: "Estudiante Dos", email: "dos@test.com" },
    ],
  };

  await useStudentStore.getState().fetchStudents(mockDataService);

  const { students, loading, error } = useStudentStore.getState();
  expect(loading).toBe(false);
  expect(error).toBe(null);
  expect(students).toHaveLength(2);
  expect(students[0].name).toBe("Estudiante Uno");
});

test('fetchStudents maneja errores correctamente', async () => {
  const mockDataService = {
    get: async () => {
      throw new Error("No se pudo obtener la lista");
    },
  };

  await useStudentStore.getState().fetchStudents(mockDataService);

  const { error, students } = useStudentStore.getState();
  expect(error).toBe("No se pudo obtener la lista");
  expect(students).toEqual([]);
});

test('addStudent agrega un estudiante a la lista', async () => {
  const newStudentData = {
    name: "Nuevo Estudiante",
    email: "nuevo@test.com",
  };

  const mockDataService = {
    post: async (url, body) => {
      expect(url).toBe("/student/register");
      expect(body).toEqual(newStudentData);
      return {
        id: 3,
        ...newStudentData,
      };
    },
  };

  await useStudentStore.getState().addStudent(mockDataService, newStudentData);

  const { students } = useStudentStore.getState();
  expect(students).toHaveLength(1);
  expect(students[0].name).toBe("Nuevo Estudiante");
});
