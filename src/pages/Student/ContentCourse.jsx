import React, { useState, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { useParams } from "react-router-dom";
import useAssignments from "../../hooks/useAssigments";
import Section from "../../components/ui/Section";
import useWebSocket from "../../hooks/useWebSockets";
import SocketStatusIndicator from "../../containers/student/content/SocketStatusIndicator";
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalBody, Button, Progress, useDisclosure } from "@heroui/react";

const DEFAULT_CONFIG = {
  workDuration: 10, // 10 segundos de trabajo
  breakDuration: 3, // 3 segundos de descanso
  cycles: 3,        // 3 ciclos
};

const ContentCourse = () => {
  const { qr_code } = useParams();
  const { assignments } = useAssignments("student");
  const course = assignments.find((c) => c.qr_code === qr_code);

  const [socketStatus, setSocketStatus] = useState({
    connections: 0,
    platforms: {},
  });

  const [sessionState, setSessionState] = useState("no_conectado");
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [pendingCycle, setPendingCycle] = useState(null);

  // Usamos useDisclosure para controlar el modal
  const { isOpen: isPhaseModalOpen, onOpen: openPhaseModal, onOpenChange: setPhaseModalOpen } = useDisclosure();

  const { sendMessage, userId, lastMessage } = useWebSocket();

  // Procesar mensajes entrantes del socket
  useEffect(() => {
    if (!lastMessage) return;
    try {
      const parsed = JSON.parse(lastMessage);
      // Ignorar mensajes propios
      if (parsed.senderId && parsed.senderId === userId) return;

      if (parsed.type === "status_update") {
        setSocketStatus({
          connections: parsed.connections,
          platforms: parsed.platforms,
        });
        if (parsed.connections >= 2 && sessionState === "no_conectado") {
          setSessionState("conectado_sin_pomodoro");
        } else if (parsed.connections < 2) {
          setSessionState("no_conectado");
          clearInterval(intervalId);
          setTimeLeft(null);
        }
      }
      if (parsed.type === "pomodoro_start") {
        const newConfig = parsed.config || DEFAULT_CONFIG;
        setConfig(newConfig);
        startPomodoro(newConfig);
      }
      if (parsed.type === "pomodoro_extend") {
        setTimeLeft((prev) => prev + parsed.seconds);
      }
    } catch (err) {
      console.error("❌ Error al procesar mensaje:", err);
    }
  }, [lastMessage, userId]);

  // Función para iniciar el temporizador local y manejar el final de fase
  const iniciarTemporizador = (duracion, esBreak, ciclo, cfg) => {
    if (intervalId) clearInterval(intervalId);
    let tiempoRestante = duracion;
    setTimeLeft(tiempoRestante);
    setIsBreak(esBreak);
    setCurrentCycle(ciclo);
    console.log("Iniciando temporizador:", duracion, "esBreak:", esBreak, "ciclo:", ciclo);
    const id = setInterval(() => {
      tiempoRestante -= 1;
      setTimeLeft(tiempoRestante);
      console.log("Tiempo restante:", tiempoRestante);
      if (tiempoRestante <= 0) {
        clearInterval(id);
        setIntervalId(null);
        console.log("🚨 Tiempo agotado. Debería mostrarse el modal.");
        const isLast = !esBreak && ciclo >= cfg.cycles;
        const siguienteFase = esBreak ? "work" : "break";
        const nextPhase = {
          type: "pomodoro_phase_end",
          phase: esBreak ? "break" : "work",
          nextCycle: ciclo + 1,
          isBreakFinished: esBreak,
          isLastCycle: isLast,
          continueAs: siguienteFase,
          senderId: userId,
        };
        setPendingCycle(nextPhase);
        openPhaseModal();
        sendMessage(JSON.stringify(nextPhase));
      }
    }, 1000);
    setIntervalId(id);
  };

  const startPomodoro = (cfg) => {
    console.log("🚀 Iniciando Pomodoro con config:", cfg);
    setSessionState("pomodoro_activo");
    iniciarTemporizador(cfg.workDuration, false, 1, cfg);
  };

  // Al hacer click en "Iniciar Pomodoro"
  const iniciarPomodoroHandler = () => {
    sendMessage(JSON.stringify({
      type: "pomodoro_start",
      config,
      senderId: userId,
    }));
    startPomodoro(config);
  };

  const aumentarTiempo = () => {
    sendMessage(JSON.stringify({
      type: "pomodoro_extend",
      seconds: 2,
      senderId: userId,
    }));
    setTimeLeft((prev) => prev + 2);
  };

  const continuarSiguienteFase = () => {
    setPhaseModalOpen(false);
    const { nextCycle, continueAs, isLastCycle } = pendingCycle;
    if (isLastCycle) {
      setSessionState("conectado_sin_pomodoro");
      setTimeLeft(null);
      return;
    }
    const duracion = continueAs === "break" ? config.breakDuration : config.workDuration;
    iniciarTemporizador(duracion, continueAs === "break", nextCycle, config);
  };

  return (
    <div className="pt-[80px]">
      <PageHeader
        title={course?.title || ""}
        showSessionState={sessionState}
      />

      <Section>
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

      <SocketStatusIndicator
        connections={socketStatus.connections}
        mobileConnected={socketStatus.platforms?.mobile > 0}
      />

      <Modal isOpen={isPhaseModalOpen} onOpenChange={setPhaseModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-xl font-bold">
                  {pendingCycle?.isBreakFinished
                    ? `¿Iniciar el siguiente ciclo (${pendingCycle?.nextCycle})?`
                    : isBreak
                    ? "¿Volver al trabajo?"
                    : "¡Trabajo terminado! ¿Empezar descanso?"}
                </h2>
              </ModalHeader>
              <ModalBody>
                {/* Puedes agregar más detalles aquí si lo deseas */}
              </ModalBody>
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
};

export default ContentCourse;
