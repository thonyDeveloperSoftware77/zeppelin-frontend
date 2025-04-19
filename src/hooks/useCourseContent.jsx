import useCourseContentStore from "../store/courseContentStore";
import useDataService from "../services/dataService";
import { useEffect } from "react";

const useCourseContent = (course_id) => {
  const dataService = useDataService();

  const {
    course_content,
    fetchCourseContent,
    addVideoSection,
    addQuizSection,
    addTextSection,
    updateVideoContent,
    updateQuizContent,
    updateTextContent,
    toggleContentStatus,
    updateModuleTitle,
    loading,
    error,
  } = useCourseContentStore();

  useEffect(() => {
    fetchCourseContent(dataService, course_id);
  }, []);


  const calculateNewModuleIndices = () => {
    const module_index = course_content.length
      ? Math.max(...course_content.map((item) => item.module_index)) + 1
      : 0;
    const section_index = 0;
    return { section_index, module_index };
  };

  const calculateSectionIndices = (module) => {
    const moduleSections = course_content.filter((item) => item.module === module);
    const section_index = moduleSections.length
      ? Math.max(...moduleSections.map((item) => item.section_index)) + 1
      : 0;
    const existingModule = course_content.find((item) => item.module === module);
    const module_index = existingModule ? existingModule.module_index : 0; 
    return { section_index, module_index };
  };

  return {
    course_content,
    loading,
    error,
    fetchCourseContent: () => fetchCourseContent(dataService, course_id),
    addNewVideoSection: (module, url, title, description) => {
      const { section_index, module_index } = calculateNewModuleIndices();
      return addVideoSection(dataService, course_id, module, url, title, description, section_index, module_index);
    },
    addNewQuizSection: (module, title, description) => {
      const { section_index, module_index } = calculateNewModuleIndices();
      return addQuizSection(dataService, course_id, module, title, description, section_index, module_index);
    },
    addNewTextSection: (module, title) => {
      const { section_index, module_index } = calculateNewModuleIndices();
      return addTextSection(dataService, course_id, module, title, section_index, module_index);
    },
    addVideoSection: (module, url, title, description) => {
      const { section_index, module_index } = calculateSectionIndices(module);
      return addVideoSection(dataService, course_id, module, url, title, description, section_index, module_index);
    },
    addQuizSection: (module, title, description) => {
      const { section_index, module_index } = calculateSectionIndices(module);
      return addQuizSection(dataService, course_id, module, title, description, section_index, module_index);
    },
    addTextSection: (module, title) => {
      const { section_index, module_index } = calculateSectionIndices(module);
      return addTextSection(dataService, course_id, module, title, section_index, module_index);
    },
    updateVideoContent: (content_id, title, url, description) => {
      return updateVideoContent(dataService, course_id, content_id, title, url, description);
    },
    updateQuizContent: (content_id, title, description, json_content) => {
      return updateQuizContent(dataService, course_id, content_id, title, description, json_content);
    },
    updateTextContent: (content_id, course_id, title, url, json_content) => {
      return updateTextContent(dataService, course_id, content_id, title, url, json_content);
    },
    toggleContentStatus: (content_id, isActive) =>
      toggleContentStatus(dataService, content_id, isActive)
    ,
    updateModuleTitle: (course_content_id, newModuleName) => {
      return updateModuleTitle(dataService, course_id, course_content_id, newModuleName);
    }
  };
};

export default useCourseContent;