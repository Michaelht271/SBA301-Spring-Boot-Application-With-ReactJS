// src/context/auth-reducer.js

// Define action types for clarity and to avoid typos
export const ACTION = {
    LOGIN: 'login',
    LOGOUT: 'logout',
};

// The reducer function handles state transitions
export function authReducer(state, action) {
    switch (action.type) {
        case ACTION.LOGIN:
            return { ...state, user: action.payload };
        case ACTION.LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}

// Function to read the initial state from localStorage
export const getInitialState = () => {
    try {
        const storedUser = localStorage.getItem('user');
        return { user: storedUser ? JSON.parse(storedUser) : null };
    } catch (error) {
        console.error("Failed to parse user from local storage", error);
        return { user: null };
    }
};
