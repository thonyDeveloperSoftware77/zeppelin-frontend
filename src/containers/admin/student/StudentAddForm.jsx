import { create } from "zustand";

const useStudentStore = create((set) => ({
  students: [],
  loading: false,
  error: null,

  fetchStudents: async (dataService) => {
    set({ loading: true });
    try {
      const students = await dataService.get("/students");
      set({ students, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addStudent: async (dataService, studentData) => {
    set({ loading: true });
    try {
      const newStudent = await dataService.post("/student/register", studentData);
      set((state) => ({ students: [...state.students, newStudent], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  removeStudent: async (dataService, studentId) => {
    try {
      await dataService.delete(`/students/${studentId}`);
      set((state) => ({
        students: state.students.filter((s) => s.id !== studentId),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useStudentStore;
