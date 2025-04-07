import React, { useEffect, useState } from 'react';
import { Card, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';

const SocketStatusIndicator = ({ connections, mobileConnected }) => {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (connections >= 2) {
      setShowCheck(true);
      const timer = setTimeout(() => {
        setShowCheck(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [connections]);

  if (connections >= 2 && !showCheck) {
    return null;
  }

  return (
    <div className="fixed top-4 right-8 z-50">
      <Card  className="p-4 shadow-md w-64">
        <h2 className="text-lg font-semibold mb-2">Estado de conexión</h2>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">Cliente móvil:</span>
          {mobileConnected ? (
            <Icon 
              icon="lucide:check-circle" 
              className="text-success" 
              width={20}
            />
          ) : (
            <Spinner size="sm" />
          )}
        </div>

        {connections < 2 && (
          <p className="text-sm text-danger">Esperando conexión...</p>
        )}

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
