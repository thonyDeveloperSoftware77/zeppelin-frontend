import 'remirror/styles/all.css';

import React, { useCallback, useState } from 'react';
import { Remirror, ThemeProvider, useRemirror, useCommands } from '@remirror/react';
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  HeadingExtension,
  TableExtension,
  ImageExtension,
  PlaceholderExtension,
  IframeExtension,
} from 'remirror/extensions';
import { FontSizeExtension } from '@remirror/extension-font-size';

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaTable,
  FaImage,
  FaPlus,
  FaVideo,
  FaTextHeight,
} from 'react-icons/fa';
import './Editor.css';

const Toolbar = () => {
  const { toggleBold, toggleItalic, toggleUnderline, createTable, addColumnAfter, insertImage, setFontSize, addIframe } = useCommands();

  const insertImagePrompt = () => {
    const url = prompt('Ingrese la URL de la imagen:');
    if (url) {
      insertImage({ src: url });
    }
  };

  const insertTable = () => {
    createTable({ rowsCount: 3, colsCount: 3 });
  };

  const addColumn = () => {
    if (addColumnAfter) {
      addColumnAfter();
    } else {
      alert('El comando para agregar columna no está disponible.');
    }
  };

  const changeFontSize = () => {
    const size = prompt('Tamaño de fuente (ej: 20px):', '20px');
    if (size) {
      setFontSize({ fontSize: size });
    }
  };

  const parseVideoUrl = (url) => {
    let embedUrl = url;
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      embedUrl = `https://www.youtube.com/embed/${match[1]}`;
    }
    return embedUrl;
  };

  const insertVideo = () => {
    const url = prompt('Ingrese la URL del video (YouTube u otro):');
    if (url) {
      const embedUrl = parseVideoUrl(url);
      addIframe({ src: embedUrl, width: 560, height: 315 });
    }
  };

  return (
    <div className="toolbar">
      <button title="Negrita" onClick={() => toggleBold()}><FaBold /></button>
      <button title="Cursiva" onClick={() => toggleItalic()}><FaItalic /></button>
      <button title="Subrayado" onClick={() => toggleUnderline()}><FaUnderline /></button>
      <button title="Insertar tabla" onClick={insertTable}><FaTable /></button>
      <button title="Agregar columna" onClick={addColumn}><FaPlus /></button>
      <button title="Insertar imagen" onClick={insertImagePrompt}><FaImage /></button>
      <button title="Insertar video" onClick={insertVideo}><FaVideo /></button>
      <button title="Cambiar tamaño del texto" onClick={changeFontSize}><FaTextHeight /></button>
    </div>
  );
};

export default function Editor() {
  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new HeadingExtension(),
      new TableExtension(),
      new ImageExtension(),
      new PlaceholderExtension({ placeholder: 'Escribí tu contenido acá...' }),
      new FontSizeExtension(),
      new IframeExtension({ enableResizing: true }),
    ],
    content: '<p>Bienvenido profe 👋</p>',
    selection: 'end',
    stringHandler: 'html',
  });

  return (
    <ThemeProvider>
      <div className="editor-wrapper">
        <div className="editor-container">
          <Remirror
            manager={manager}
            initialContent={state}
            autoFocus
            autoRender='end'
            onChange={({ helpers }) => {
              const html = helpers.getHTML();
              console.log('Contenido actual:', html);
            }}
          >
            <Toolbar />
          </Remirror>
        </div>
      </div>
    </ThemeProvider>
  );
}
