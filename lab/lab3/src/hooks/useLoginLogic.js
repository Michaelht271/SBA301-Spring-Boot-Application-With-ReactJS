import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Validator from '../utils/validator.js'; // Import custom validator
import loginRules from '../features/authentication/loginRules.js'; // Import login validation rules

const validator = new Validator(loginRules); // Instantiate the validator with our rules

export default function useLoginLogic() {
    const [email, setEmail] = useState('');
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
        const newErrors = validator.validate({ email, password });
        setValidationErrors(newErrors);

        // If there are no validation errors, proceed with login
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };


    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setError('');
        setValidationErrors({}); // Reset validation errors
        navigate('/');
    };

    // Wrapper function to set email and clear its validation error
    const handleEmailChange = (value) => {
        setEmail(value);
        if (validationErrors.email) {
            setValidationErrors(prev => ({ ...prev, email: undefined }));
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
        email,
        setEmail: handleEmailChange, // Pass the wrapper function
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