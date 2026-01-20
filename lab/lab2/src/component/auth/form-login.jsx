import { useState } from 'react';
import { Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginForm({
                                      username = '',
                                      password = '',
                                      error = '',
                                      onUsernameChange = () => {},
                                      onPasswordChange = () => {},
                                      onSubmit = () => {},
                                      onCancel = () => {},
                                      isLoading = false,
                                  }) {
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        if (!username.trim()) {
            setUsernameError('Username is required');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        setValidated(true);

        if (isValid) {
            onSubmit(e);
        }
    };

    const handleUsernameChange = (val) => {
        onUsernameChange(val);
        setUsernameError('');
        setValidated(false);
    };

    const handlePasswordChange = (val) => {
        onPasswordChange(val);
        setPasswordError('');
        setValidated(false);
    };

    return (
        <div className="w-100" style={{ maxWidth: '500px', margin: '0 auto' }}>
            {error && (
                <div
                    className="p-3 mb-4 rounded-2"
                    style={{
                        background: '#f8d7da',
                        border: '1px solid #f5c6cb',
                        color: '#721c24'
                    }}
                >
                    <strong>Error!</strong> {error}
                </div>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Username Field */}
                <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Label className="fw-semibold">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        disabled={isLoading}
                        autoFocus
                        isInvalid={!!usernameError}
                        size="lg"
                        className="border-2"
                        style={{
                            borderColor: usernameError ? '#dc3545' : '#dee2e6',
                            transition: 'all 0.3s ease'
                        }}
                    />
                    {usernameError && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                            {usernameError}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <InputGroup size="lg">
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            disabled={isLoading}
                            isInvalid={!!passwordError}
                            className="border-2"
                            style={{
                                borderColor: passwordError ? '#dc3545' : '#dee2e6',
                                transition: 'all 0.3s ease'
                            }}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            style={{ borderWidth: '2px' }}
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </Button>
                    </InputGroup>
                    {passwordError && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                            {passwordError}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                {/* Action Buttons */}
                <div className="d-grid gap-3 mb-4">
                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={isLoading}
                        className="fw-semibold"
                        style={{
                            background: isLoading ? '#6c757d' : 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                            border: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(13, 110, 253, 0.4)'
                        }}
                    >
                        {isLoading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </Button>
                    <Button
                        variant="outline-secondary"
                        size="lg"
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="fw-semibold"
                        style={{ borderWidth: '2px' }}
                    >
                        Cancel
                    </Button>
                </div>

                {/* Demo Credentials */}
                <div
                    className="p-4 rounded-3"
                    style={{
                        background: 'linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)',
                        border: '2px solid #b8d4ff'
                    }}
                >
                    <p className="fw-bold text-primary mb-2">🔐 Demo Credentials:</p>
                    <small className="d-block text-dark mb-1">
                        Username: <code className="bg-white px-2 py-1 rounded">admin</code>
                    </small>
                    <small className="d-block text-dark">
                        Password: <code className="bg-white px-2 py-1 rounded">123456</code>
                    </small>
                </div>
            </Form>
        </div>
    );
}