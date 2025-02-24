import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";

const ClerkProviderWrapper = ({ publishableKey }) => {
  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;
