import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../Api/ApiClient";
import { loginApi } from "../Api/HisabKitabApi";

// 1: Create Context
export const AuthContext = createContext();

// Custom Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// 2: Provide the context to the app
export default function AuthProvider({ children }) {
    // Load authentication state from localStorage (if available)
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    async function login(email, password) {
        try {
            const response = await loginApi(email, password);
            if (response.status === 200) {
                // Update authentication state
                setIsAuthenticated(true);
                setUser(response.data);

                // Persist authentication state in localStorage
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("user", JSON.stringify(response.data));

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
    }

    function logout() {
        setIsAuthenticated(false);
        setUser(null);

        // Remove authentication data from localStorage
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
    }

    useEffect(() => {
        console.log("Auth State Updated:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}
