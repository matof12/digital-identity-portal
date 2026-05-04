import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    login: (user:string, pass:string) => Promise<boolean>;
    logout:() => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider ({ children }: { children: ReactNode }) {

    //El estado inicial no es null y se busca el token en localStorage para mantener la sesión activa incluso después de recargar la página. Si no hay token, se establece como null.

    const [token,setToken] = useState <string | null>(
        localStorage.getItem("token")
    );   

    const login = async (user:string, pass:string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (user === "admin" && pass === "1234") {
            const fakeToken = btoa(`${user}:${Date.now()}`);
            localStorage.setItem("token", fakeToken);
            setToken(fakeToken);
            return true;
        }
        return false;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};