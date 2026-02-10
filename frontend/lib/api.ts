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


export const login = async (identifier: string, password: string) => {
    // Call Next.js internal API
    // Using axios instance but with relative URL which should work if valid baseURL or if we override
    // Actually, for internal API, let's just use the relative path, assuming baseURL is set or handle it.
    // If API_URL is localhost:8000, we need to override it for auth.
    // However, simplest is to use `axios` directly for auth or a separate instance.
    // But let's try to reuse `api` instance but override baseURL in the call.

    return api.post("/api/auth/login", { identifier, password }, {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || "", // Empty string uses current origin in browser
    });
};



export const register = async (username: string, email: string, password: string) => {
    return api.post("/api/auth/register", { username, email, password }, {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || "",
    });
};


export const submitFeedback = async (name: string, email: string, message: string, rating: number) => {
    return api.post("/api/feedback", { name, email, message, rating }, {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || "",
    });
};

export default api;
