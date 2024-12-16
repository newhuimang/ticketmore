import { createContext, useContext, useState } from "react";

// Context 타입 정의
interface MainTabContextType {
  isActive: "home" | "category" | "search" | "my";
  setIsActive: React.Dispatch<React.SetStateAction<"home" | "category" | "search" | "my">>;
}

const MainTabContext = createContext<MainTabContextType | undefined>(undefined);

export function MainTabProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState<"home" | "category" | "search" | "my">("home");

  return (
    <MainTabContext.Provider value={{ isActive, setIsActive }}>{children}</MainTabContext.Provider>
  );
}

export const useMainTab = (): MainTabContextType => {
  const context = useContext(MainTabContext);
  if (!context) {
    throw new Error("useMainTab must be used within a MainTabProvider");
  }
  return context;
};
