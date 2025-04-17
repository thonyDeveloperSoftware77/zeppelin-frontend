import useCourseContentStore from "../../src/store/courseContentStore";

afterEach(() => {
  useCourseContentStore.setState({
    course_content: [],
    loading: false,
    error: null,
  });
});

test('fetchCourseContent carga contenido correctamente', async () => {
  const mockDataService = {
    get: async () => [
      {
        course_content_id: 1,
        course_id: 101,
        module: "Intro",
        content_type: "text",
        content_id: "t1",
        section_index: 0,
        module_index: 0,
        Details: {
          title: "Bienvenida",
          json_content: [],
        },
      },
    ],
  };

  await useCourseContentStore.getState().fetchCourseContent(mockDataService, 101);

  const { course_content, loading, error } = useCourseContentStore.getState();
  expect(loading).toBe(false);
  expect(error).toBe(null);
  expect(course_content).toHaveLength(1);
  expect(course_content[0].module).toBe("Intro");
});

test('addTextSection agrega sección al estado', async () => {
  const mockDataService = {
    post: async () => ({
      course_content_id: 2,
      course_id: 101,
      module: "Intro",
      content_type: "text",
      content_id: "txt001",
      section_index: 1,
      module_index: 0,
      Details: { title: "Nueva sección" },
    }),
  };

  await useCourseContentStore.getState().addTextSection(
    mockDataService,
    101,
    "Intro",
    "Nueva sección",
    1,
    0
  );

  const { course_content } = useCourseContentStore.getState();
  expect(course_content.some(c => c.content_id === "txt001")).toBe(true);
});

test('addVideoSection agrega sección de video', async () => {
  const mockDataService = {
    post: async () => ({
      course_content_id: 3,
      course_id: 101,
      module: "Video",
      content_type: "video",
      content_id: "vid001",
      section_index: 0,
      module_index: 1,
      Details: {
        title: "Video Intro",
        description: "Explicación del curso",
        url: "https://video.url",
      },
    }),
  };

  await useCourseContentStore.getState().addVideoSection(
    mockDataService,
    101,
    "Video",
    "https://video.url",
    "Video Intro",
    "Explicación del curso",
    0,
    1
  );

  const { course_content } = useCourseContentStore.getState();
  expect(course_content.find((item) => item.content_id === "vid001")).toBeTruthy();
});

test('updateTextContent actualiza título y contenido json', async () => {
  // Estado inicial
  useCourseContentStore.setState({
    course_content: [
      {
        course_content_id: 1,
        content_id: "t1",
        Details: {
          title: "Viejo título",
          json_content: [],
        },
      },
    ],
  });

  const mockDataService = {
    put: async () => ({
      content_id: "t1",
      title: "Nuevo título",
      json_content: [{ type: "text", content: "Hola mundo" }],
    }),
  };

  await useCourseContentStore.getState().updateTextContent(
    mockDataService,
    101,
    "t1",
    "Nuevo título",
    "",
    [{ type: "text", content: "Hola mundo" }]
  );

  const updated = useCourseContentStore.getState().course_content.find(c => c.content_id === "t1");
  expect(updated.Details.title).toBe("Nuevo título");
  expect(updated.Details.json_content[0].content).toBe("Hola mundo");
});

test('updateVideoContent reemplaza el video correctamente', async () => {
  // Estado inicial
  useCourseContentStore.setState({
    course_content: [
      {
        course_content_id: 2,
        content_id: "v1",
        content_type: "video",
        Details: { title: "Antiguo Video", description: "", url: "" },
      },
    ],
  });

  const mockDataService = {
    put: async () => ({
      content_id: "v1",
      content_type: "video",
      title: "Video Actualizado",
      description: "Desc actualizado",
      url: "https://nuevo.video",
    }),
  };

  await useCourseContentStore.getState().updateVideoContent(
    mockDataService,
    101,
    "v1",
    "Video Actualizado",
    "https://nuevo.video",
    "Desc actualizado"
  );

  const updated = useCourseContentStore.getState().course_content.find(c => c.content_id === "v1");
  expect(updated.title).toBe("Video Actualizado"); // Propiedades nuevas fuera de `Details`
});
