import axios from "axios"

export const apiClient = axios.create(

    {
        baseURL: 'https://hisab-kitab-backend-ixz5.onrender.com/Hisab-Kitab'
    }
)