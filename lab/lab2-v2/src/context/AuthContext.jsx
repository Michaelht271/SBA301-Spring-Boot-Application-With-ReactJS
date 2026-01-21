import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { ACTION, authReducer, getInitialState } from '../redux/auth-reducer.js'; // Import from new utility file

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
    const login = (userData) => {
        dispatch({ type: ACTION.LOGIN, payload: userData });
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

// Add PropTypes for type checking
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
