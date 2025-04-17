// src/components/EditorToolbar.js
import React, { useState } from "react";
import { useRemirrorContext } from "@remirror/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaTable,
  FaVideo,
  FaListUl,
} from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
} from "@heroui/react";

const EditorToolbar = () => {
  const {
    toggleBold,
    toggleItalic,
    toggleUnderline,
    createTable,
    setFontSize,
    addIframe,
    toggleBulletList,
  } = useRemirrorContext().commands;

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState(null);

  const parseVideoUrl = (url) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/;
    const match = url.match(youtubeRegex);
    return match && match[1]
      ? `https://www.youtube.com/embed/${match[1]}`
      : url;
  };

  const handleInsertVideo = () => {
    if (!videoUrl.trim()) {
      setVideoError("La URL del video es requerida");
      return;
    }
    if (addIframe.enabled()) {
      const embedUrl = parseVideoUrl(videoUrl);
      addIframe({ src: embedUrl, width: 560, height: 315 });
      setVideoUrl("");
      setVideoError(null);
      setVideoModalOpen(false);
    }
  };

  return (
    <div className="toolbar flex items-center space-x-2 p-2 bg-gray-100 rounded-t-md">
      <button title="Negrita" onClick={() => toggleBold()} disabled={!toggleBold.enabled()} className="p-2 hover:bg-gray-200 rounded"><FaBold /></button>
      <button title="Cursiva" onClick={() => toggleItalic()} disabled={!toggleItalic.enabled()} className="p-2 hover:bg-gray-200 rounded"><FaItalic /></button>
      <button title="Subrayado" onClick={() => toggleUnderline()} disabled={!toggleUnderline.enabled()} className="p-2 hover:bg-gray-200 rounded"><FaUnderline /></button>
      <button title="Insertar tabla" onClick={() => createTable({ rowsCount: 3, colsCount: 3 })} disabled={!createTable.enabled()} className="p-2 hover:bg-gray-200 rounded"><FaTable /></button>
      <button title="Insertar video" onClick={() => setVideoModalOpen(true)} className="p-2 hover:bg-gray-200 rounded"><FaVideo /></button>
      <button title="Tamaño S" onClick={() => setFontSize("16px")} disabled={!setFontSize.enabled()} className="p-2 hover:bg-gray-200 rounded">S</button>
      <button title="Tamaño M" onClick={() => setFontSize("18px")} disabled={!setFontSize.enabled()} className="p-2 hover:bg-gray-200 rounded">M</button>
      <button title="Tamaño L" onClick={() => setFontSize("25px")} disabled={!setFontSize.enabled()} className="p-2 hover:bg-gray-200 rounded">L</button>
      <button title="Lista con viñetas" onClick={() => toggleBulletList()} disabled={!toggleBulletList.enabled()} className="p-2 hover:bg-gray-200 rounded"><FaListUl /></button>

      {/* Modal para insertar video */}
      <Modal isOpen={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <ModalContent>
          <ModalHeader>Insertar Video</ModalHeader>
          <ModalBody>
            <Input
              label="URL del video"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              isRequired
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {videoError && <p className="text-red-500">{videoError}</p>}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => { setVideoUrl(""); setVideoError(null); setVideoModalOpen(false); }}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleInsertVideo}>
              Insertar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditorToolbar;
