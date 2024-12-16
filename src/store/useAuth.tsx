import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

interface AuthContextType {
  auth: { id: string; pw: string } | null;
  isLoggedIn: boolean;
  login: (user: { id: string; pw: string }) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState = {
  auth: null,
  isLoggedIn: false,
};

const authReducer = (
  state: { auth: { id: string; pw: string } | null; isLoggedIn: boolean },
  action: { type: "LOGIN"; user: { id: string; pw: string } } | { type: "LOGOUT" }
) => {
  switch (action.type) {
    case "LOGIN":
      return { auth: action.user, isLoggedIn: true };
    case "LOGOUT":
      return { auth: null, isLoggedIn: false };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      try {
        const parsedUser = JSON.parse(getUser);
        dispatch({ type: "LOGIN", user: parsedUser });
      } catch (error) {
        console.error("user data error", error);
      }
    }
  }, []);

  const login = (values: { id: string; pw: string }): boolean => {
    const { id, pw } = values;
    if (id !== "user" || pw !== "password123@") {
      return false;
    } else {
      const user = { id, pw };
      dispatch({ type: "LOGIN", user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth: state.auth, isLoggedIn: state.isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
