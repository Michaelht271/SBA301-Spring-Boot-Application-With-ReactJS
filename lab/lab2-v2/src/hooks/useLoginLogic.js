// 4. useLoginLogic.js - Custom hook for login logic, now with custom validation
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Validator from '../utils/validator.js'; // Import custom validator
import loginRules from '../features/authentication/loginRules.js'; // Import login validation rules

const validator = new Validator(loginRules); // Instantiate the validator with our rules

export default function useLoginLogic() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // This state is for API/general errors
    const [validationErrors, setValidationErrors] = useState({}); // New state for field validation errors
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate the form using our custom validator
        const newErrors = validator.validate({ username, password });
        setValidationErrors(newErrors);

        // If there are no validation errors, proceed with login
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Fake API call - replace with actual API
            if (username === 'admin' && password === '123456') {
                login({ username: 'admin', role: 'admin' });
                navigate(from, { replace: true });
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setUsername('');
        setPassword('');
        setError('');
        setValidationErrors({}); // Reset validation errors
        navigate('/');
    };

    // Wrapper function to set username and clear its validation error
    const handleUsernameChange = (value) => {
        setUsername(value);
        if (validationErrors.username) {
            setValidationErrors(prev => ({ ...prev, username: undefined }));
        }
    };

    // Wrapper function to set password and clear its validation error
    const handlePasswordChange = (value) => {
        setPassword(value);
        if (validationErrors.password) {
            setValidationErrors(prev => ({ ...prev, password: undefined }));
        }
    };

    const resetError = () => setError('');

    return {
        username,
        setUsername: handleUsernameChange, // Pass the wrapper function
        password,
        setPassword: handlePasswordChange, // Pass the wrapper function
        error,
        validationErrors, // Pass validation errors to the component
        isLoading,
        handleLogin,
        handleCancel,
        resetError
    };
}