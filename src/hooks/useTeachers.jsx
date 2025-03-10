import { useEffect } from "react";
import useDataService from "../services/dataService";
import useTeacherStore from "../store/teacherStore";

const useTeachers = () => {
  const dataService = useDataService();
  const { teachers, fetchTeachers, addTeacher, removeTeacher, loading, error } = useTeacherStore();

  useEffect(() => {
    fetchTeachers(dataService);
  }, []);

  return { 
    teachers, 
    addTeacher: (teacherData) => addTeacher(dataService, teacherData), 
    removeTeacher: (teacherId) => removeTeacher(dataService, teacherId), 
    loading, 
    error 
  };
};

export default useTeachers;
