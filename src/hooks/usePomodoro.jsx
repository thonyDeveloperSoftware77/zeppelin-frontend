import { useEffect, useState } from "react";
import { useDisclosure } from "@heroui/react";

const DEFAULT_CONFIG = {
  workDuration: 10, // 10 segundos de trabajo
  breakDuration: 3, // 3 segundos de descanso
  cycles: 3,        // 3 ciclos
};

const usePomodoro = ({
  userId,
  lastMessage,
  sendWebMessage,
  sendMobileMessage,
  mobileReady,
  isMobileConnectionEnabled,
  socketStatus,
}) => {
  // Estados
  const [sessionState, setSessionState] = useState("no_conectado");
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [pendingCycle, setPendingCycle] = useState(null);

  // Control del modal
  const {
    isOpen: isPhaseModalOpen,
    onOpen: openPhaseModal,
    onOpenChange: setPhaseModalOpen,
  } = useDisclosure();

  // Enviar mensaje a ambos WebSockets (web y móvil si está activo)
  const broadcastMessage = (payload) => {
    const message = JSON.stringify(payload);
    sendWebMessage(message);
    if (mobileReady && isMobileConnectionEnabled) {
      sendMobileMessage(message);
    }
  };

  // Iniciar o reanudar el temporizador
  const startTimer = (duration, isBreakPhase, cycle, cfg) => {
    if (intervalId) clearInterval(intervalId);

    let tiempo = duration;
    setTimeLeft(tiempo);
    setIsBreak(isBreakPhase);
    setCurrentCycle(cycle);

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(id);
          setIntervalId(null);

          const isLast = !isBreakPhase && cycle >= cfg.cycles;
          const nextPhase = isBreakPhase ? "work" : "break";
          const payload = {
            type: "pomodoro_phase_end",
            phase: isBreakPhase ? "break" : "work",
            nextCycle: cycle + 1,
            isBreakFinished: isBreakPhase,
            isLastCycle: isLast,
            continueAs: nextPhase,
            senderId: userId,
          };
          setPendingCycle(payload);
          openPhaseModal();
          broadcastMessage(payload);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    setIntervalId(id);
  };

  // Procesar mensajes WebSocket
  useEffect(() => {
    if (!lastMessage) return;
    try {
      const parsed = JSON.parse(lastMessage);
      if (parsed.senderId === userId) return;

      switch (parsed.type) {
        case "status_update":
          if (parsed.connections >= 2 && sessionState === "no_conectado") {
            setSessionState("conectado_sin_pomodoro");
          } else if (parsed.connections < 2) {
            setSessionState("no_conectado");
            clearInterval(intervalId);
            setIntervalId(null);
            setTimeLeft(null);
          }
          break;
        case "pomodoro_start":
          const newConfig = parsed.config || DEFAULT_CONFIG;
          setConfig(newConfig);
          startPomodoro(newConfig);
          break;
        case "pomodoro_extend":
          extendTime(parsed.seconds);
          break;
        case "pomodoro_session_end":
          setSessionState("conectado_sin_pomodoro");
          setTimeLeft(null);
          setCurrentCycle(0);
          setIsBreak(false);
          clearInterval(intervalId);
          setIntervalId(null);
          break;
        default:
          console.warn(`⚠️ Tipo de mensaje desconocido: ${parsed.type}`);
      }
    } catch (err) {
      console.error("❌ Error al procesar mensaje WebSocket:", err);
    }
  }, [lastMessage, userId, intervalId, sessionState]);

  // Iniciar una nueva sesión Pomodoro
  const startPomodoro = (cfg) => {
    setSessionState("pomodoro_activo");
    startTimer(cfg.workDuration, false, 1, cfg);
  };

  // Manejar el inicio del Pomodoro
  const iniciarPomodoroHandler = () => {
    const payload = {
      type: "pomodoro_start",
      config,
      senderId: userId,
    };
    broadcastMessage(payload);
    startPomodoro(config);
  };

  // Extender el tiempo del temporizador
  const extendTime = (seconds) => {
    setTimeLeft((prev) => {
      const newTime = prev + seconds;
      // Si el temporizador está detenido (por ejemplo, en el modal), reiniciarlo
      if (!intervalId && sessionState === "pomodoro_activo") {
        startTimer(newTime, isBreak, currentCycle, config);
      }
      return newTime;
    });
  };

  // Aumentar tiempo y notificar a otros clientes
  const aumentarTiempo = () => {
    const payload = {
      type: "pomodoro_extend",
      seconds: 2,
      senderId: userId,
    };
    broadcastMessage(payload);
    extendTime(2);
  };

  // Continuar a la siguiente fase o finalizar la sesión
  const continuarSiguienteFase = () => {
    setPhaseModalOpen(false);
    const { nextCycle = 1, continueAs = "work", isLastCycle = false } = pendingCycle || {};

    if (isLastCycle) {
      const payload = {
        type: "pomodoro_session_end",
        senderId: userId,
      };
      broadcastMessage(payload);
      setSessionState("conectado_sin_pomodoro");
      setTimeLeft(null);
      setCurrentCycle(0);
      setIsBreak(false);
      clearInterval(intervalId);
      setIntervalId(null);
      return;
    }

    const duration = continueAs === "break" ? config.breakDuration : config.workDuration;
    startTimer(duration, continueAs === "break", nextCycle, config);
  };

  return {
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
  };
};

export default usePomodoro;