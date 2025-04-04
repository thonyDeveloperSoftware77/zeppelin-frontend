import { create } from "zustand";

const useAssignmentStore = create((set) => ({
    assignments: [],
    loading: false,
    error: null,

    fetchAssignments: async (dataService, type = "student", course_id) => {
        set({ loading: true, error: null });

        let endpoint = "/assignments/student";
        if (type === "teacher") {
            endpoint = `/assignments/teacher/${course_id}`; // ← Cuando tengas ese endpoint listo
        }

        try {
            const response = await dataService.get(endpoint);
            const assignments = response.map((item) => ({
                id: item.id,
                title: item.title || "Sin título",
                start_date: item.start_date || "Fecha no disponible",
                is_verify: !!item.is_verify,
                qr_code: item.qr_code,
                image: item.image || null,
            }));
            set({ assignments, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    assignToCourse: async (dataService, qrCode) => {
        set({ loading: true, error: null });
        try {
            await dataService.post("/assignment", { qr_code: qrCode });
            await set((state) => state.fetchAssignments(dataService));
            set({ loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error; // ← importante para manejarlo directamente en el form
        }
    }


}));
export default useAssignmentStore;
