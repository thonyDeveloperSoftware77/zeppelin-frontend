import { create } from "zustand";

const useCourseContentStore = create((set, get) => ({
  course_content: [],
  loading: false,
  error: null,

  /* ---------- GET ---------- */
  fetchCourseContent: async (dataService, course_id) => {
    set({ loading: true, error: null });
    try {
      const response = await dataService.get(
        `/course-content?course_id=${course_id}`
      );

      const course_content = response.map((item) => ({
        course_content_id: item.course_content_id,
        course_id: item.course_id,
        module: item.module || "Sin módulo",
        content_type: item.content_type,
        content_id: item.content_id,
        section_index: item.section_index ?? 0,
        module_index: item.module_index ?? 0,
        is_active: item.is_active ?? null,
        Details: item.Details || [],
      }));

      set({ course_content, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  /* ---------- ADD ---------- */
  addVideoSection: async (
    dataService,
    course_id,
    module,
    url,
    title,
    description,
    section_index,
    module_index
  ) => {
    set({ loading: true, error: null });
    try {
      // ← La API debe devolver la nueva fila:
      const newItem = await dataService.post(
        `/course-content/section/video?course_id=${course_id}`,
        { module, url, title, description, section_index, module_index }
      );

      // Añadimos al array sin refetch:
      set((state) => ({
        course_content: [...state.course_content, newItem],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /* ---------- UPDATE ---------- */
  updateVideoContent: async (
    dataService,
    course_id,
    content_id,
    title,
    url,
    description
  ) => {
    set({ loading: true, error: null });
    try {
      // La API devuelve el registro actualizado:
      const updated = await dataService.put(`/course-content/video`, {
        content_id,
        title,
        url,
        description,
      });

      // Reemplazamos el elemento en el array:
      set((state) => ({
        course_content: state.course_content.map((item) =>
          item.content_id === content_id ? { ...item, ...updated } : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /* ---------- MISMAS IDEAS PARA QUIZ Y TEXT ---------- */
  addQuizSection: async (
    dataService,
    course_id,
    module,
    title,
    description,
    section_index,
    module_index
  ) => {
    set({ loading: true, error: null });
    try {
      const newItem = await dataService.post(
        `/course-content/section/quiz?course_id=${course_id}`,
        { module, title, description, section_index, module_index }
      );

      set((state) => ({
        course_content: [...state.course_content, newItem],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateQuizContent: async (
    dataService,
    course_id,
    content_id,
    title,
    description,
    json_content
  ) => {
    set({ loading: true, error: null });
    try {
      const updated = await dataService.put(`/course-content/quiz`, {
        content_id,
        title,
        description,
        json_content,
      });

      set((state) => ({
        course_content: state.course_content.map((item) =>
          item.content_id === content_id ? { ...item, ...updated } : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  addTextSection: async (
    dataService,
    course_id,
    module,
    title,
    section_index,
    module_index
  ) => {
    set({ loading: true, error: null });
    try {
      await dataService.post(
        `/course-content/section/text?course_id=${course_id}`,
        { module, title, section_index, module_index }
      );
  
      await get().fetchCourseContent(dataService, course_id);  
      set({ loading: false });
      
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateTextContent: async (
    dataService,
    course_id,
    content_id,
    title,
    url,
    json_content
  ) => {
    set({ error: null });
    try {
      const updated = await dataService.put(`/course-content/text`, {
        content_id,
        title,
        url,
        json_content,
      });

      set((state) => ({
        course_content: state.course_content.map((item) =>
          item.content_id === content_id
            ? {
              ...item,
              Details: {
                ...item.Details,
                title, 
                json_content,
              },
            }
            : item
        ),
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  toggleContentStatus: async (dataService, content_id, isActive) => {
    set({ loading: true, error: null });
    try {
      await dataService.put(`/course-content/status`, {
        content_id,
        is_active: isActive
      });
      
      // Actualizar estado local
      set((state) => ({
        course_content: state.course_content.map(item => 
          item.content_id === content_id 
            ? {...item, is_active: isActive} 
            : item
        ),
        loading: false
      }));
      
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateModuleTitle: async (dataService, course_id, course_content_id, newModuleName) => {
    set({ loading: true, error: null });
    try {
      // Enviar solicitud al backend para actualizar el módulo
      await dataService.put(`/course-content/module-title`, {
        course_content_id,
        module_title: newModuleName
      });

      // Actualizar el estado local
      set((state) => ({
        course_content: state.course_content.map((item) =>
          item.course_content_id === course_content_id
            ? { ...item, module: newModuleName }
            : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
}));

export default useCourseContentStore;
