import { create } from "zustand";

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async (dataService) => {
    set({ loading: true });
    try {
      const courses = await dataService.get("/courses/teacher"); // O "/courses/student" según el rol
      set({ courses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addCourse: async (dataService, courseData) => {
    set({ loading: true });
    try {
      await dataService.post("/course", courseData);
      await set((state) => state.fetchCourses(dataService))
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCourseStore;
