import apiClient from './apiClient';

const authService = {
  login: async (email, password) => {
    try {
      // The backend is expected to return user data and a token
      const response = await apiClient.post('/auth/login', { email, password });

      if (response.data && response.data.token) {
        // Store user info and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        // You might want to set the token in the apiClient header for subsequent requests
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        return response.data.user;
      } else {
        // Handle cases where response is not as expected
        throw new Error('Login response is not in the expected format.');
      }
    } catch (error) {
      // apiClient will throw an error for non-2xx responses
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    // Clear user info and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Remove the authorization header from apiClient
    delete apiClient.defaults.headers.common['Authorization'];
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default authService;