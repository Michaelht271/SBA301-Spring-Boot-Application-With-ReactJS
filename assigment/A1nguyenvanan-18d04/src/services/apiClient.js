import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api', // The base URL for the Spring Boot backend
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  Add a request interceptor to include the auth token in headers.
  This is a placeholder for now. When authentication is fully implemented,
  this interceptor will fetch the token from local storage or another secure place.
*/
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
  Add a response interceptor to handle global errors, like 401 Unauthorized.
*/
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   // Handle unauthorized access, e.g., redirect to login
    //   window.location = '/login';
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
