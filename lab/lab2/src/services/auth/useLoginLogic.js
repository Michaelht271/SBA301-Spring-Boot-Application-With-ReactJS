// 4. useLoginLogic.js - Custom hook cho login logic
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function useLoginLogic() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }
        
        e.preventDefault();
        setValidated(true);
        setIsLoading(true);
        setError('');

        try {
            // Fake API call - thay bằng API thực tế
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
        setValidated(false);
        navigate('/');
    };
    const resetError = () => setError('');

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        setError,
        isLoading,
        validated,
        handleLogin,
        handleCancel,
        resetError
    };
}