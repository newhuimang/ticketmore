import { createContext, useContext, useState } from "react";
import FeedbackMessage from "@/components/Feedback";

import {
  FeedbackContextType,
  FeedbackOptions,
  FeedbackType,
} from "../components/Feedback/iFeedback";

export const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [alertMessage, setAlertMessage] = useState<{
    type: FeedbackType;
    options: FeedbackOptions;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    type: FeedbackType;
    options: FeedbackOptions;
  } | null>(null);
  const alert = (options: FeedbackOptions) => {
    setAlertMessage({ type: "alert", options });
  };

  const toast = (options: FeedbackOptions) => {
    setToastMessage({ type: "toast", options });
  };

  return (
    <FeedbackContext.Provider value={{ alert, toast }}>
      {children}
      {alertMessage && <FeedbackMessage message={alertMessage} setMessage={setAlertMessage} />}
      {toastMessage && <FeedbackMessage message={toastMessage} setMessage={setToastMessage} />}
    </FeedbackContext.Provider>
  );
}

export default function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
}
