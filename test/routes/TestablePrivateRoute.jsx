export const getRouteView = ({ isLoaded, isSignedIn, role, pathname }) => {
    if (!isLoaded) return 'Cargando...';
    if (!isSignedIn) return 'Redirigiendo a /sign-in';
    if (!role) return 'No tienes un rol asignado. Contacta con el administrador.';
  
    const roleRoutes = {
      'org:admin': '/admin',
      'org:teacher': '/teacher',
      'org:student': '/student',
    };
  
    const allowedRoute = roleRoutes[role];
  
    if (!pathname.startsWith(allowedRoute)) {
      return `Redirigiendo a ${allowedRoute}/dashboard`;
    }
  
    switch (role) {
      case 'org:admin':
        return 'Admin Routes';
      case 'org:teacher':
        return 'Teacher Routes';
      case 'org:student':
        return 'Student Routes';
      default:
        return 'Redirigiendo a /sign-in';
    }
  };