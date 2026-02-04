import apiClient from './apiClient';

// Configuration: update these to match your backend
const API_USE_COOKIES = false; // set true if backend uses HttpOnly cookies and requires CSRF
const AUTH_HEADER_NAME = 'authorization'; // header name (axios lower-cases response headers)
const TOKEN_STORAGE_KEY = 'app_access_token';

let inMemoryToken = null;

const authService = {

    // Token helpers
    setToken: (rawToken, { persistent = true } = {}) => {
        inMemoryToken = rawToken;
        if (persistent && typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(TOKEN_STORAGE_KEY, rawToken);
        }
    },

    getToken: () => {
        if (inMemoryToken) return inMemoryToken;
        if (typeof window !== 'undefined' && window.localStorage) {
            const t = localStorage.getItem(TOKEN_STORAGE_KEY);
            if (t) {
                inMemoryToken = t;
                return t;
            }
        }
        return null;
    },

    clearToken: () => {
        inMemoryToken = null;
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    },

    // Lấy CSRF token từ backend (only used when API_USE_COOKIES = true)
    getCsrfToken: async () => {
        if (!API_USE_COOKIES) return null;
        return (await apiClient.get('/api/auth/csrf')).data?.token;
    },

    login: async (email, password) => {
        try {
            // If using cookie-based auth, fetch CSRF token first
            let csrfToken = null;
            if (API_USE_COOKIES) {
                csrfToken = await authService.getCsrfToken();
            }

            // Prepare login payload. Use JSON as your curl sample sends JSON and endpoint is /api/auth/login
            const payload = { username: email, password };
            const response = await apiClient.post('/api/auth/login', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
                },
            });

            // Read token from Authorization header or response body; normalize by removing any 'Bearer' prefix (with or without space)
            const rawHeader = response.headers[AUTH_HEADER_NAME] || response.headers[AUTH_HEADER_NAME.toLowerCase()];
            const rawBodyToken = response.data?.token;
            const rawTokenSource = rawHeader || rawBodyToken || null;

            if (rawTokenSource) {
                // remove 'Bearer' (case-insensitive) and any following spaces
                const normalized = rawTokenSource.replace(/^Bearer\s*/i, '').trim();
                if (normalized) {
                    authService.setToken(normalized, { persistent: true });
                }
            }

            // Get current user
            return await authService.getCurrentUser();

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            throw new Error(errorMessage);
        }
    },

    logout: async () => {
        try {
            if (API_USE_COOKIES) {
                const csrfToken = await authService.getCsrfToken();
                await apiClient.post('/logout', null, {
                    headers: {
                        ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
                    }
                });
            } else {
                // If using token-based auth, just call logout endpoint and clear token
                await apiClient.post('/logout');
            }
        } catch {
            // ignore
        } finally {
            authService.clearToken();
        }
    },

    // Gọi /api/auth/me để lấy user đang login
    getCurrentUser: async () => {
        try {
            const response = await apiClient.get('/api/auth/me');
            return response.data;
        } catch {
            return null; // Chưa login hoặc session hết
        }
    }
};

export default authService;
