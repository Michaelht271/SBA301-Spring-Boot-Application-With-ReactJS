import React from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const LoginForm = ({ loginFormProps }) => {
  const { email, password, loading, error, setEmail, setPassword, handleSubmit } = loginFormProps;
  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100" disabled={loading}>
        {loading ? (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        ) : (
          'Login'
        )}
      </Button>
    </Form>
  );
};

export default LoginForm;
