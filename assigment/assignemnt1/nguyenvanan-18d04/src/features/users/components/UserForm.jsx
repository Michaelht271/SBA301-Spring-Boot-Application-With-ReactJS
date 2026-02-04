import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ user, onSave, onCancel }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
      accountId: null,
    accountName: '',
    accountEmail: '',
    accountRole: 'STAFF',
    accountPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user, accountPassword: '' });
    } else {
      setFormData({
        accountId: null,
        accountName: '',
        accountEmail: '',
        accountRole: 'STAFF',
        accountPassword: '',
      });
    }
    setValidated(false);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const dataToSend = { ...formData };
      if (user && !dataToSend.accountPassword) {
        delete dataToSend.accountPassword;
      }
      onSave(dataToSend);
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Account Name</Form.Label>
        <Form.Control
          type="text"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide an account name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Account Email</Form.Label>
        <Form.Control
          type="email"
          name="accountEmail"
          value={formData.accountEmail}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email address.
        </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="accountPassword"
          value={formData.accountPassword}
          onChange={handleChange}
          required={!user}
          placeholder={user ? 'Leave blank to keep current password' : ''}
        />
        <Form.Control.Feedback type="invalid">
          Password is required for new users.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Account Role</Form.Label>
        <Form.Select name="accountRole" value={formData.accountRole} onChange={handleChange}>
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
            <option value="CUSTOMER">Customer</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;