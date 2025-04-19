import React, { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { useParams } from "react-router-dom";
import useAssignments from "../../hooks/useAssigments";
import Section from "../../components/ui/Section";
import useWebSocket from "../../hooks/useWebSocket";
import usePomodoro from "../../hooks/usePomodoro";
import SocketStatusIndicator from "../../containers/student/content/SocketStatusIndicator";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Progress,
} from "@heroui/react";

export default function ContentCourse() {
  const { qr_code } = useParams();
  const { assignments } = useAssignments("student");
  const course = assignments.find((c) => c.qr_code === qr_code);

  // Estado para conexiones
  const [socketStatus, setSocketStatus] = useState({
    connections: 0,
    platforms: {},
  });
  const [isMobileConnectionEnabled, setIsMobileConnectionEnabled] = useState(false);

  // WebSocket para plataforma web
  const {
    sendMessage: sendWebMessage,
    userId,
    lastMessage,
    ready: webReady,
    error: webError,
  } = useWebSocket("web");

  // WebSocket para plataforma móvil (solo si está habilitado)
  const {
    sendMessage: sendMobileMessage,
    ready: mobileReady,
    error: mobileError,
  } = useWebSocket(isMobileConnectionEnabled ? "mobile" : null);

  // Hook para manejar el Pomodoro
  const {
    sessionState,
    currentCycle,
    timeLeft,
    isBreak,
    config,
    pendingCycle,
    isPhaseModalOpen,
    setPhaseModalOpen,
    iniciarPomodoroHandler,
    aumentarTiempo,
    continuarSiguienteFase,
  } = usePomodoro({
    userId,
    lastMessage,
    sendWebMessage,
    sendMobileMessage,
    mobileReady,
    isMobileConnectionEnabled,
    socketStatus,
  });

  // Actualizar estado de conexiones desde mensajes WebSocket
  useEffect(() => {
    if (!lastMessage) return;
    try {
      const parsed = JSON.parse(lastMessage);
      if (parsed.senderId === userId) return;

      if (parsed.type === "status_update") {
        setSocketStatus({
          connections: parsed.connections,
          platforms: parsed.platforms || {},
        });
      }
    } catch (err) {
      console.error("❌ Error al procesar mensaje WebSocket:", err);
    }
  }, [lastMessage, userId]);

  // Conectar plataforma móvil
  const handleConnectMobile = () => {
    setIsMobileConnectionEnabled(true);
  };

  return (
    <div className="pt-[80px]">
      {/* Banner de error si la conexión falla */}
      {(webError || mobileError) && (
        <div className="p-2 mb-4 bg-red-100 text-red-800 rounded">
          ⚠️ {webError || mobileError}
        </div>
      )}

      <PageHeader
        title={course?.title || ""}
        showSessionState={sessionState}
      />

      <Section>
        {/* Botón para conectar plataforma móvil */}
        {!isMobileConnectionEnabled && (
          <button
            onClick={handleConnectMobile}
            className="px-4 py-2 bg-green-600 text-white rounded-md mb-4"
          >
            Conectar Plataforma Móvil
          </button>
        )}

        {sessionState === "conectado_sin_pomodoro" && (
          <button
            onClick={iniciarPomodoroHandler}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Iniciar Pomodoro
          </button>
        )}

        {sessionState === "pomodoro_activo" && timeLeft !== null && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold">
              {isBreak ? "Descanso" : "Trabajo"}: {timeLeft}s
            </h2>
            <Progress
              value={
                isBreak
                  ? ((timeLeft / config.breakDuration) * 100).toFixed(0)
                  : ((timeLeft / config.workDuration) * 100).toFixed(0)
              }
            />
            <p>Ciclo actual: {currentCycle}</p>
            <button
              onClick={aumentarTiempo}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              +2 segundos
            </button>
          </div>
        )}

        <div className="mt-6">
          <p>
            📱 Cliente móvil{" "}
            {socketStatus.platforms.mobile > 0 ? "conectado" : "no conectado"}
          </p>
          <p>🔌 Conexiones activas: {socketStatus.connections}</p>
        </div>
      </Section>

      {/* Indicador flotante de estado */}
      <SocketStatusIndicator
        connections={socketStatus.connections}
        webConnected={socketStatus.platforms.web > 0 || webReady}
        mobileConnected={socketStatus.platforms.mobile > 0}
      />

      <Modal isOpen={isPhaseModalOpen} onOpenChange={setPhaseModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-xl font-bold">
                  {pendingCycle?.isBreakFinished
                    ? `¿Iniciar el siguiente ciclo (${pendingCycle.nextCycle})?`
                    : isBreak
                      ? "¿Volver al trabajo?"
                      : "¡Trabajo terminado! ¿Empezar descanso?"}
                </h2>
              </ModalHeader>
              <ModalBody />
              <ModalFooter>
                <Button variant="soft" color="warning" onPress={aumentarTiempo}>
                  +2 segundos
                </Button>
                <Button onPress={() => { onClose(); continuarSiguienteFase(); }}>
                  Continuar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}