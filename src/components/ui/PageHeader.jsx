import React from "react";
import { useNavigate } from "react-router-dom";
import { cn, Chip } from "@heroui/react";
import { BiLeftArrowAlt } from "react-icons/bi";

const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  actions,
  className = "",
  onBack = false,
  showSessionState = "", // <--- recibe string: "no_conectado", "conectado_sin_pomodoro", "pomodoro_activo"
}) => {
  const navigate = useNavigate();

  const getChip = () => {
    if (showSessionState === "pomodoro_activo") {
      return (
        <Chip color="success" variant="dot">
          Pomodoro activo
        </Chip>
      );
    }

    if (showSessionState === "conectado_sin_pomodoro") {
      return (
        <Chip color="warning" variant="dot">
          Conectado sin Pomodoro
        </Chip>
      );
    }

    return null;
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 bg-white shadow-md p-4 flex items-center justify-between",
        "ml-[19%]",
        "px-[10px]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <BiLeftArrowAlt size={12} />
          </button>
        )}
        {Icon && <Icon className="h-8 w-8 text-blue-600" />}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      <div className="flex px-[25px] gap-2 items-center">
        {actions}
        {getChip()}
      </div>
    </div>
  );
};

export default PageHeader;
