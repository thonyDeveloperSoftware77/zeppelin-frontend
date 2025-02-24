import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ClerkProviderWrapper from "./context/ClerkProviderWrapper";
import { HeroUIProvider } from "@heroui/react";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("❌ Falta la clave pública de Clerk en el .env");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <ClerkProviderWrapper publishableKey={PUBLISHABLE_KEY} />
    </HeroUIProvider>
  </React.StrictMode>
);
