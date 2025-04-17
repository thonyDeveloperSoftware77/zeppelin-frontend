// routeLogic.test.js

import { getRouteView } from "./TestablePrivateRoute";

test('devuelve "Cargando..." si Clerk no cargó', () => {
  const result = getRouteView({
    isLoaded: false,
    isSignedIn: true,
    role: 'org:teacher',
    pathname: '/teacher/dashboard',
  });

  expect(result).toBe('Cargando...');
});

test('redirecciona si no está autenticado', () => {
  const result = getRouteView({
    isLoaded: true,
    isSignedIn: false,
    role: null,
    pathname: '/',
  });

  expect(result).toBe('Redirigiendo a /sign-in');
});

test('muestra error si no hay rol', () => {
  const result = getRouteView({
    isLoaded: true,
    isSignedIn: true,
    role: null,
    pathname: '/',
  });

  expect(result).toBe('No tienes un rol asignado. Contacta con el administrador.');
});

test('redirige si ruta no coincide con rol', () => {
  const result = getRouteView({
    isLoaded: true,
    isSignedIn: true,
    role: 'org:student',
    pathname: '/teacher/dashboard',
  });

  expect(result).toBe('Redirigiendo a /student/dashboard');
});

test('muestra vista correcta según rol y ruta', () => {
  expect(
    getRouteView({ isLoaded: true, isSignedIn: true, role: 'org:admin', pathname: '/admin/dashboard' })
  ).toBe('Admin Routes');

  expect(
    getRouteView({ isLoaded: true, isSignedIn: true, role: 'org:teacher', pathname: '/teacher/dashboard' })
  ).toBe('Teacher Routes');

  expect(
    getRouteView({ isLoaded: true, isSignedIn: true, role: 'org:student', pathname: '/student/dashboard' })
  ).toBe('Student Routes');
});
