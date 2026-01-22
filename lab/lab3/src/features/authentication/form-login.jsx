import { useState } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'; // Import PropTypes

export default function LoginForm({
                                      email = '',
                                      password = '',
                                      error = '', // For API errors
                                      validationErrors = {}, // For field validation errors
                                      onEmailChange = () => {},
                                      onPasswordChange = () => {},
                                      onSubmit = () => {},
                                      onCancel = () => {},
                                      isLoading = false,
                                  }) {
    const [showPassword, setShowPassword] = useState(false);

    // The handleSubmit function is now simplified, as validation is handled by the parent hook.
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
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

            <Form onSubmit={handleSubmit}>
                {/* Email Field */}
                <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        disabled={isLoading}
                        autoFocus
                        isInvalid={!!validationErrors.email}
                        size="lg"
                        className="border-2"
                        style={{
                            borderColor: validationErrors.email ? '#dc3545' : '#dee2e6',
                            transition: 'all 0.3s ease'
                        }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                        {validationErrors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <InputGroup size="lg">
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            disabled={isLoading}
                            isInvalid={!!validationErrors.password}
                            className="border-2"
                            style={{
                                borderColor: validationErrors.password ? '#dc3545' : '#dee2e6',
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
                    <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                        {validationErrors.password}
                    </Form.Control.Feedback>
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
                        Email: <code className="bg-white px-2 py-1 rounded">admin@example.com</code>
                    </small>
                    <small className="d-block text-dark">
                        Password: <code className="bg-white px-2 py-1 rounded">adminpassword</code>
                    </small>
                </div>
            </Form>
        </div>
    );
}

// Add PropTypes for type checking
LoginForm.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    validationErrors: PropTypes.object,
    onEmailChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
};