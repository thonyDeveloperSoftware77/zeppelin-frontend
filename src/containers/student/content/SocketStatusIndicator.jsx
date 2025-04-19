// src/containers/student/content/SocketStatusIndicator.jsx
import React, { useEffect, useState } from 'react';
import { Card, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';

/**
 * Props:
 * - connections: número total de conexiones activas
 * - webConnected: boolean, indica si hay conexión web
 * - mobileConnected: boolean, indica si hay conexión móvil
 */
const SocketStatusIndicator = ({ connections, webConnected, mobileConnected }) => {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (connections >= 2) {
      setShowCheck(true);
      const timer = setTimeout(() => setShowCheck(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [connections]);

  // Mientras no toque el estado de "Todo listo" (showCheck), ocultamos el card
  if (connections >= 2 && !showCheck) return null;

  return (
    <div className="fixed top-4 right-8 z-50">
      <Card className="p-4 shadow-md w-64">
        <h2 className="text-lg font-semibold mb-2">Estado de conexión</h2>

        {/* Estado Web */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">Cliente web:</span>
          {webConnected ? (
            <Icon icon="lucide:check-circle" className="text-success" width={20} />
          ) : (
            <Spinner size="sm" />
          )}
        </div>

        {/* Estado Móvil */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">Cliente móvil:</span>
          {mobileConnected ? (
            <Icon icon="lucide:check-circle" className="text-success" width={20} />
          ) : (
            <Spinner size="sm" />
          )}
        </div>

        {/* Mensaje de espera si aún no hay 2 conexiones */}
        {connections < 2 && (
          <p className="text-sm text-danger">Esperando conexiones...</p>
        )}

        {/* Mensaje de "Todo listo" cuando ya hubo 2 conexiones */}
        {connections >= 2 && showCheck && (
          <div className="mt-4 flex items-center gap-2 text-success">
            <Icon icon="lucide:check" width={20} />
            <span className="text-sm">¡Todo listo!</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SocketStatusIndicator;