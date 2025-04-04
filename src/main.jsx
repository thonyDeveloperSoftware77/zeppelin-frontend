import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import App from "./App.jsx";
import 'remirror/styles/all.css';
import ClerkProviderWrapper from "./context/ClerkProviderWrapper.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("❌ Falta la clave pública de Clerk en el .env");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastProvider placement="top-right" />
    <ClerkProviderWrapper publishableKey={PUBLISHABLE_KEY}>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </ClerkProviderWrapper>
  </>
);
