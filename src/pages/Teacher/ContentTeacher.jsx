import Editor from "../../components/editor/Editor";
import MenuContent from "../../components/ui/MenuContent";
import PageHeader from "../../components/ui/PageHeader";

const ContentTeacher = () => {
  return (
    <div  className="px-2">
      <PageHeader title="Curso xyz" />
      <div className="flex w-full">
        <div className="w-1/4 py-4">
          <MenuContent />
        </div>
        <div className="w-3/4">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ContentTeacher
