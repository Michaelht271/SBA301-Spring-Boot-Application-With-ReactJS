import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import authService from '../../services/authService.js';
import LoginForm from '../../features/auth/components/LoginForm'; // Import the new LoginForm component

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await authService.login(email, password);
      if (user) {
        // Redirect and reload the app to update the auth context
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={12} style={{ width: '400px' }}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            <LoginForm
              loginFormProps={{
                email,
                password,
                loading,
                error,
                setEmail,
                setPassword,
                handleSubmit,
              }}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;