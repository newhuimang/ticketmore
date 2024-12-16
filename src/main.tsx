import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./store/useAuth.tsx";
import { OverlayProvider } from "./store/useOverlay.tsx";
import { ModalProvider } from "./store/useModal.tsx";
import { FeedbackProvider } from "./store/useFeedback.tsx";

import "./index.css";
import { MainTabProvider } from "./store/useMainTab.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <MainTabProvider>
        <OverlayProvider>
          <FeedbackProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </FeedbackProvider>
        </OverlayProvider>
      </MainTabProvider>
    </AuthProvider>
  </StrictMode>
);
