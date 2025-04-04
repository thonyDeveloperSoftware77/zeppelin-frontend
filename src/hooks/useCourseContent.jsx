import { useEffect } from "react";
import useCourseContentStore from "../store/courseContentStore";
import useDataService from "../services/dataService";

const useCourseContent = (course_id) => {
  const dataService = useDataService();

  const {
    course_content,
    fetchCourseContent,
    addModule,
    addSection,
    loading,
    error,
  } = useCourseContentStore();

  useEffect(() => {
    fetchCourseContent(dataService, course_id);
  }, [course_id]);

  return {
    course_content,
    loading,
    error,
    addModule: (name) => addModule(course_id, name),
    addSection: (moduleName, type) => addSection(course_id, moduleName, type),
  };
};

export default useCourseContent;
