import "remirror/styles/all.css";
import React, { useCallback, useState } from "react";
import {
  Remirror,
  ThemeProvider,
  useRemirror,
} from "@remirror/react";
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  HeadingExtension,
  TableExtension,
  PlaceholderExtension,
  IframeExtension,
  BulletListExtension,
  ListItemExtension,
  OrderedListExtension,
  TaskListExtension,
} from "remirror/extensions";
import { FontSizeExtension } from "@remirror/extension-font-size";
import { addToast, Button } from "@heroui/react";
import "./Editor.css";
import EditorToolbar from "./EditorToolBar";
import useCourseContent from "../../hooks/useCourseContent";

export default function Editor({ contentId, courseId, title, jsonContent }) {
  const { updateTextContent, loading, error } = useCourseContent(courseId);

  // State for inline title editing
  const [editableTitle, setEditableTitle] = useState(title || "");

  // Initialize Remirror content
  const initialContent = (() => {
    if (!jsonContent) {
      return {
        type: "doc",
        content: [],
      };
    }
    if (Array.isArray(jsonContent)) {
      return {
        type: "doc",
        content: jsonContent,
      };
    }
    if (typeof jsonContent === "string") {
      try {
        const parsed = JSON.parse(jsonContent);
        if (Array.isArray(parsed)) {
          return {
            type: "doc",
            content: parsed,
          };
        }
        return parsed;
      } catch (e) {
        console.error("Error parseando jsonContent:", e);
        return {
          type: "doc",
          content: [],
        };
      }
    }
    if (typeof jsonContent === "object" && jsonContent.type === "doc") {
      return jsonContent;
    }
    return {
      type: "doc",
      content: [],
    };
  })();

  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new HeadingExtension(),
      new TableExtension(),
      new PlaceholderExtension({ placeholder: "Escribí tu contenido acá..." }),
      new FontSizeExtension({ defaultSize: "16px", unit: "px" }),
      new IframeExtension({ enableResizing: true }),
      new BulletListExtension(),
      new ListItemExtension(),
      new OrderedListExtension(),
      new TaskListExtension(),
    ],
    content: initialContent,
    selection: "end",
    stringHandler: "prosemirror",
  });

  const handleChange = useCallback(({ helpers }) => {
    const json = helpers.getJSON();
    console.log("Contenido JSON actual:", json);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const json = manager.view.state.toJSON().doc;
      await updateTextContent(contentId,courseId, editableTitle, "", json);
      addToast({
        title: "Módulo Actualizado",
        description: "El Módulo ha sido ingresado con éxito",
        color: "success"
      })
    } catch (err) {
      addToast({
        title: "Error",
        description: err,
        color: "danger"
      })
    }
  }, [manager, editableTitle, contentId, updateTextContent]);

  const handleError = useCallback((error) => {
    console.error("Editor error:", error);
    return {
      type: "doc",
      content: [],
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="mb-4">
        <input
          type="text"
          value={editableTitle}
          onChange={(e) => setEditableTitle(e.target.value)}
          placeholder="Título del contenido"
          className="text-2xl font-semibold text-gray-800 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="border border-gray-200 rounded-md">
        <Remirror
          key={contentId}
          manager={manager}
          initialContent={state}
          autoFocus
          autoRender="end"
          onChange={handleChange}
          onError={handleError}
        >
          <EditorToolbar />
        </Remirror>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          color="primary"
          onPress={handleSave}
          className="px-4"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
      {error && (
        <div className="mt-2 text-red-600">
          Error al guardar: {error}
        </div>
      )}
    </ThemeProvider>
  );
}