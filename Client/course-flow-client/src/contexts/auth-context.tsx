import type { UserResponse } from "@/dto/response/user.response.dto";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  user: UserResponse | null;
  authLoaded: boolean;
  isAuthenticated: boolean;
  login: (params: {
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
}

function readUserFromStorage(): UserResponse | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as UserResponse) : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(() =>
    readUserFromStorage()
  );
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setAuthLoaded(true);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue === null) setUser(null);
      if (e.key === "user" && e.newValue) {
        try {
          setUser(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = ({
    user,
    accessToken,
    refreshToken,
  }: {
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
  }) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({ user, authLoaded, isAuthenticated, login, logout }),
    [user, authLoaded, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
