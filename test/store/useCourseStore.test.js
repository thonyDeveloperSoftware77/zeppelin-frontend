import useCourseStore from "../../src/store/courseStore";

afterEach(() => {
  useCourseStore.setState({
    courses: [],
    loading: false,
    error: null,
  });
});

test('fetchCourses carga cursos correctamente', async () => {
  const mockDataService = {
    get: async () => [
      {
        id: 1,
        title: "Curso de React",
        start_date: "2024-01-01",
        description: "Curso completo de React",
        teacher_id: 7,
        qr_code: "qr123",
      },
    ],
  };

  await useCourseStore.getState().fetchCourses(mockDataService);

  const { courses, loading, error } = useCourseStore.getState();
  expect(loading).toBe(false);
  expect(error).toBe(null);
  expect(courses).toHaveLength(1);
  expect(courses[0].title).toBe("Curso de React");
});

test('fetchCourses maneja errores correctamente', async () => {
  const mockDataService = {
    get: async () => {
      throw new Error("No se pudieron obtener los cursos");
    },
  };

  await useCourseStore.getState().fetchCourses(mockDataService);

  const { error, courses } = useCourseStore.getState();
  expect(error).toBe("No se pudieron obtener los cursos");
  expect(courses).toEqual([]);
});

test('addCourse agrega curso y recarga la lista', async () => {
  const postData = {
    title: "Nuevo Curso",
    description: "Descripción del nuevo curso",
    start_date: "2024-06-01",
    teacher_id: 99,
    qr_code: "qr999",
  };

  const mockDataService = {
    post: async (url, body) => {
      expect(url).toBe('/course');
      expect(body).toEqual(postData);
    },
    get: async () => [
      {
        id: 10,
        title: "Nuevo Curso",
        description: "Descripción del nuevo curso",
        start_date: "2024-06-01",
        teacher_id: 99,
        qr_code: "qr999",
      },
    ],
  };

  await useCourseStore.getState().addCourse(mockDataService, postData);

  const { courses } = useCourseStore.getState();
  expect(courses).toHaveLength(1);
  expect(courses[0].title).toBe("Nuevo Curso");
});
