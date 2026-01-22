import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
//  Import from new utility file
import apis from '../services/apis.js';
import {ACTION, authReducer, getInitialState} from "../reducers/auth-reducer.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, getInitialState());

    // This effect synchronizes the state with localStorage whenever the user changes.
    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
        } else {
            localStorage.removeItem('user');
        }
    }, [state.user]);

    // The login/logout functions now dispatch actions instead of directly setting state.
    const login = async (email, password) => {
        const users = await apis.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user && user.role === 'admin') {
            dispatch({ type: ACTION.LOGIN, payload: user });
        } else {
            throw new Error('Invalid credentials or not an admin.');
        }
    };

    const logout = () => {
        dispatch({ type: ACTION.LOGOUT });
    };

    // The context value is memoized for performance.
    const contextValue = useMemo(() => ({
        user: state.user,
        login,
        logout
    }), [state.user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Export a hook for consuming the auth context in components/hooks
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
};

// Add PropTypes to use the imported PropTypes and avoid unused import warnings
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
