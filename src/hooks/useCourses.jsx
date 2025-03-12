import { useEffect } from "react";
import useDataService from "../services/dataService";
import useCourseStore from "../store/courseStore";

const useCourses = () => {
  const dataService = useDataService();
  const { courses, fetchCourses, addCourse, loading, error } = useCourseStore();

  useEffect(() => {
    fetchCourses(dataService);
  }, []);

  return {
    courses,
    addCourse: (courseData) => addCourse(dataService, courseData),
    loading,
    error,
  };
};

export default useCourses;
