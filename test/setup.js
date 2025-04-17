import { JSDOM } from 'jsdom';
import { expect } from 'bun:test';

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.navigator = dom.window.navigator;

globalThis.Element = window.Element;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Node = window.Node;
globalThis.MutationObserver = window.MutationObserver;

// 👇👇👇 ESTA LÍNEA ES CLAVE
globalThis.document.body.innerHTML = '<div id="root"></div>'; 
globalThis.HTMLElement.prototype.focus = () => {}; // opcional para evitar errores de focus
globalThis.SVGElement = class {}; // necesario para React internamente

expect.extend({
  toBeInTheDocument(received) {
    const pass = document.body.contains(received);
    return {
      pass,
      message: () =>
        pass
          ? 'Elemento está en el documento'
          : 'Elemento NO está en el documento',
    };
  },
});

globalThis.expect = expect;
