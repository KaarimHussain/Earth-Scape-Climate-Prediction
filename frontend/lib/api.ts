import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to attach token
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const predictWeather = async (city: string, country: string) => {
    return api.post("/predict", { city, country });
};

export const getCorrelationMatrix = async (city?: string, country?: string) => {
    return api.get("/analytics/correlation", { params: { city, country } });
};

export const compareVariables = async (variables: string[], city?: string, country?: string) => {
    return api.post("/analytics/comparison", { variables, city, country });
};

export const getHistoricalData = async (city?: string, country?: string, startDate?: string, endDate?: string) => {
    return api.get("/analytics/data", {
        params: {
            city,
            country,
            start_date: startDate,
            end_date: endDate
        }
    });
};

export const login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return api.post("/auth/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
};

export const register = async (username: string, email: string, password: string) => {
    return api.post("/auth/register", { username, email, password });
};

export const submitFeedback = async (name: string, email: string, message: string, rating: number) => {
    return api.post("/feedback", { name, email, message, rating });
};

export default api;
