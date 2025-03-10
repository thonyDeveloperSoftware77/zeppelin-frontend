import React from "react";
import { cn } from "@heroui/react";
import { BiLeftArrowAlt } from "react-icons/bi";

const PageHeader = ({
  title,
  subtitle,
  icon: Icon, // Recibe un ícono como prop
  actions, // Puedes pasar botones u otros elementos aquí
  className = "",
  onBack, // Función para botón "Volver"
}) => {
  return (
    <div className={cn("bg-white shadow-md p-4 rounded-lg flex items-center justify-between", className)}>
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <BiLeftArrowAlt className="h-6 w-6 text-gray-600" />
          </button>
        )}
        {Icon && <Icon className="h-8 w-8 text-blue-600" />} {/* Ícono dinámico */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;
