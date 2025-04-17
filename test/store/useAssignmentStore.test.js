import useAssignmentStore from "../../src/store/assigmentStore";

afterEach(() => {
  // Reseteamos el estado después de cada test
  useAssignmentStore.setState({
    assignments: [],
    loading: false,
    error: null,
  });
});

test('fetchAssignments carga datos (estudiante)', async () => {
  const mockDataService = {
    get: async () => [
      {
        id: 1,
        title: "Tarea 1",
        start_date: "2024-01-01",
        is_verify: true,
        qr_code: "abc123",
        image: "img.jpg",
      },
    ],
  };

  await useAssignmentStore.getState().fetchAssignments(mockDataService, "student");

  const { assignments, loading, error } = useAssignmentStore.getState();
  expect(loading).toBe(false);
  expect(error).toBe(null);
  expect(assignments).toHaveLength(1);
  expect(assignments[0].title).toBe("Tarea 1");
});

test('fetchAssignments carga datos (profesor)', async () => {
  const mockDataService = {
    get: async (endpoint) => {
      expect(endpoint).toBe('/assignments/teacher/999');
      return [
        {
          id: 2,
          title: "Tarea del profe",
          start_date: "2024-04-10",
          is_verify: false,
          qr_code: "xyz999",
          image: null,
        },
      ];
    },
  };

  await useAssignmentStore.getState().fetchAssignments(mockDataService, "teacher", 999);

  const { assignments } = useAssignmentStore.getState();
  expect(assignments[0].title).toBe("Tarea del profe");
});

test('fetchAssignments maneja errores', async () => {
  const mockDataService = {
    get: async () => {
      throw new Error("Falló la carga");
    },
  };

  await useAssignmentStore.getState().fetchAssignments(mockDataService);

  const { error, assignments } = useAssignmentStore.getState();
  expect(error).toBe("Falló la carga");
  expect(assignments).toEqual([]);
});

test('assignToCourse hace post y recarga las tareas', async () => {
  const mockDataService = {
    post: async (url, body) => {
      expect(url).toBe('/assignment');
      expect(body.qr_code).toBe('curso123');
    },
    get: async () => [
      {
        id: 3,
        title: "Tarea nueva",
        start_date: "2024-05-01",
        is_verify: true,
        qr_code: "curso123",
        image: null,
      },
    ],
  };

  await useAssignmentStore.getState().assignToCourse(mockDataService, 'curso123');

  const { assignments } = useAssignmentStore.getState();
  expect(assignments).toHaveLength(1);
  expect(assignments[0].title).toBe("Tarea nueva");
});
