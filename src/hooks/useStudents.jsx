import { useEffect } from "react";
import useDataService from "../services/dataService";
import useStudentStore from "../store/studentStore";

const useStudents = () => {
  const dataService = useDataService();
  const { students, fetchStudents, addStudent, loading, error } = useStudentStore();

  useEffect(() => {
    fetchStudents(dataService);
  }, []);

  return { 
    students, 
    addStudent: (studentData) => addStudent(dataService, studentData), 
    loading, 
    error 
  };
};

export default useStudents;
