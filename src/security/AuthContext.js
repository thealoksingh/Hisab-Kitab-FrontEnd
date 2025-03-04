import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../Api/ApiClient";
import { loginApi, refreshTokenApi } from "../Api/HisabKitabApi";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("isAuthenticated") === "true");
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken") || null);

    useEffect(() => {
        if (accessToken) {
            setAuthHeader(accessToken);
        }

        apiClient.interceptors.response.use(
            response => response,
            async (error) => {
                if (error.response?.status === 401 && refreshToken) {
                    const success = await refreshTokenHandler();
                    if (success) {
                        // Retry the original request with the new token
                        error.config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
                        return apiClient.request(error.config);
                    } else {
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );
    }, [accessToken, refreshToken]);

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

                setAuthHeader(response.data.data.accessToken);
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

    async function refreshTokenHandler() {
        try {
            const response = await refreshTokenApi(refreshToken);
            if (response.status === 200) {
                const newAccessToken = response.data.data.accessToken;
                setAccessToken(newAccessToken);
                localStorage.setItem("accessToken", newAccessToken);
                setAuthHeader(newAccessToken);
                return true;
            }
        } catch (error) {
            console.error("Refresh token failed:", error);
        }
        return false;
    }

    function setAuthHeader(token) {
        apiClient.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    }

    function logout() {
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
