import { useEffect } from "react";
import useDataService from "../services/dataService";
import useAssignmentStore from "../store/assigmentStore";

const useAssignments = (type = "student", course_id) => {
  const dataService = useDataService();
  const { assignments, fetchAssignments, assignToCourse, loading, error } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments(dataService, type, course_id);
  }, [type]);

  return {
    assignments,
    loading,
    assignToCourse: (qrCode) => assignToCourse(dataService, qrCode),
    error,
  };
};

export default useAssignments;
