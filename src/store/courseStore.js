import { create } from "zustand";

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async (dataService) => {
    set({ loading: true });
    try {
      const response = await dataService.get("/courses/teacher"); // O "/courses/student" según el rol
      const courses = response.map((course) => ({
        id: course.id,
        title: course.title || "Sin título",
        start_date: course.start_date || "Fecha no disponible",
        description: course.description || "Descripción no disponible",
        teacher_id: course.teacher_id, // Incluyendo teacher_id
        qr_code: course.qr_code,
      }));
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
