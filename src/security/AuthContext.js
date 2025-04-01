import { createContext, useContext, useState } from "react";
import { loginApi, logOutUser } from "../Api/HisabKitabApi";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("isAuthenticated") === "true");
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken") || null);

    async function login(email, password) {
        try {
            const response = await loginApi(email, password);
            if (response.status === 200) {
                const userData = {
                    userId: response.data.data.userId,
                    fullName: response.data.data.fullName,
                    contactNo: response.data.data.contactNo
                };
                setIsAuthenticated(true);
                setUser(userData);
                setAccessToken(response.data.data.accessToken);
                setRefreshToken(response.data.data.refreshToken);
    
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);
                return true;
            }
        } catch (error) {
            // logout(); // Ensure user is logged out in case of an error
           
            if (error.response?.status === 400) {
                // throw new Error(error.response.data.message); // Invalid email or password
            } else {
                // throw new Error("Something went wrong. Please try again later.");
            }
        }
    }
    


    async function  logout() {
      
        await logOutUser()
        setIsAuthenticated(false);
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, accessToken, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
}
