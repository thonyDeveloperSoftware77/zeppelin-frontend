import { create } from "zustand";

const useTeacherStore = create((set) => ({
  teachers: [],
  loading: false,
  error: null,

  fetchTeachers: async (dataService) => {
    set({ loading: true });
    try {
      const teachers = await dataService.get("/teachers");
      set({ teachers, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addTeacher: async (dataService, teacherData) => {
    set({ loading: true });
    try {
      const newTeacher = await dataService.post("/teacher/register", teacherData);
      set((state) => ({ teachers: [...state.teachers, newTeacher], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  removeTeacher: async (dataService, teacherId) => {
    try {
      await dataService.delete(`/teachers/${teacherId}`);
      set((state) => ({
        teachers: state.teachers.filter((t) => t.id !== teacherId),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useTeacherStore;
