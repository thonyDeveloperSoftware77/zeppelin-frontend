import '../test/setup.js';
import { render } from '@testing-library/react';
import App from './MockedApp.jsx'; // App que usa componentes mockeados

test('renders learn react link', () => {
  const { getByText } = render(<App />); // ✅ Usamos `getByText` directamente del render
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); // Usa nuestro matcher de setup.js
});
