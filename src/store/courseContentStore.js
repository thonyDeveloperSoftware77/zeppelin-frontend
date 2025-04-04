import { create } from "zustand";

let idCounter = 1;

const useCourseContentStore = create((set) => ({
  course_content: [],
  loading: false,
  error: null,

  fetchCourseContent: async (dataService, course_id) => {
    set({ loading: true, error: null });

    try {
      const fakeData = [
        {
          course_content_id: idCounter++,
          module: "Módulo 1",
          course_id,
          content_id: `text-${idCounter}`,
          content_type: "text",
          section_index: 0,
        },
      ];

      await new Promise((res) => setTimeout(res, 300));
      set({ course_content: fakeData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addModule: async (course_id, moduleName) =>
    set((state) => {
      const newContent = {
        course_content_id: idCounter++,
        module: moduleName,
        course_id,
        content_id: `text-${idCounter}`,
        content_type: "text",
        section_index: 0,
      };
      return {
        course_content: [...state.course_content, newContent],
      };
    }),

  addSection: async (course_id, moduleName, content_type) =>
    set((state) => {
      const moduleSections = state.course_content.filter(
        (item) => item.module === moduleName
      );
      const section_index = moduleSections.length;

      const newSection = {
        course_content_id: idCounter++,
        module: moduleName,
        course_id,
        content_id: `${content_type}-${idCounter}`,
        content_type,
        section_index,
      };

      return {
        course_content: [...state.course_content, newSection],
      };
    }),
}));

export default useCourseContentStore;
