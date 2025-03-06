import { createContext, useContext, useState } from "react";
import apiClient from "../Api/ApiClient";
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
                console.log("response = ");
                console.log(response.data);
                return true;
            }
        } catch (error) {
            if (error.response?.status === 400) {
                alert(error.response.data.message); // Invalid email or password
            } else {
                alert("Something went wrong. Please try again later.");
            }
            logout();
            return false;
        }
    }


    function logout() {
        logOutUser()
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
