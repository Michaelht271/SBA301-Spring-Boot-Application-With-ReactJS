import axios from 'axios';
import authService from './authService';

// By default assume backend returns JWT in Authorization header (not cookie-based session).
// If your backend uses HttpOnly cookies for auth, set API_USE_COOKIES = true.
const API_USE_COOKIES = false; // <-- change to true if backend uses cookie/session and requires CSRF
const TOKEN_PREFIX = 'Bearer ';

const apiClient = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const method = config.method?.toLowerCase();

        // Ensure headers object exists
        config.headers = config.headers || {};

        // Attach Authorization header automatically when we have a token
        const token = authService.getToken();
        if (token) {
            // include prefix here; authService stores raw token
            config.headers['Authorization'] = TOKEN_PREFIX + token;
        }

        // ✅ GẮN CSRF CHO REQUEST GHI DỮ LIỆU (only when using cookie-based auth)
        if (API_USE_COOKIES && ['post', 'put', 'delete'].includes(method)) {
            const csrfToken = await authService.getCsrfToken();
            if (csrfToken) {
                config.headers['X-CSRF-TOKEN'] = csrfToken;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear stored token and redirect to login (avoid infinite loops)
            try {
                authService.clearToken();
            } catch {
                // ignore
            }
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
