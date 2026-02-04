import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import authService from '../../services/authService.js';
import userService from '../../services/userService.js';

const SettingsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    accountName: '',
    accountEmail: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      let user = await authService.getCurrentUser();
      if (!user) {
        user = authService.getCachedUser();
      }
      
      if (user) {
        setCurrentUser(user);
        setFormData({
          accountName: user.accountName || '',
          accountEmail: user.accountEmail || '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Validate passwords if changing password
    if (formData.newPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('New passwords do not match!');
        return;
      }
      if (formData.newPassword.length < 6) {
        toast.error('New password must be at least 6 characters long!');
        return;
      }
    }

    setSaving(true);
    try {
      const updateData = {
        accountId: currentUser.accountId,
        accountName: formData.accountName,
        accountEmail: formData.accountEmail,
      };

      // Include password fields only if user is changing password
      if (formData.newPassword) {
        updateData.oldPassword = formData.oldPassword;
        updateData.accountPassword = formData.newPassword;
      }

      await userService.update(currentUser.accountId, updateData);
      toast.success('Profile updated successfully!');

      // Update local user data
      const updatedUser = {
        ...currentUser,
        accountName: formData.accountName,
        accountEmail: formData.accountEmail,
      };
      authService.setCurrentUser(updatedUser);
      setCurrentUser(updatedUser);

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Profile Settings</h4>
            </Card.Header>
            <Card.Body>
              {currentUser && (
                <>
                  <Alert variant="info" className="mb-4">
                    <strong>Account Information:</strong><br />
                    Role: <strong>{authService.getUserRoles(currentUser)}</strong>
                  </Alert>

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {/* Basic Profile Info */}
                    <h5 className="mb-3">Basic Information</h5>

                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a full name.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Email Address</Form.Label>
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

                    <hr />

                    {/* Password Change Section */}
                    <h5 className="mb-3">Change Password (Optional)</h5>
                    <p className="text-muted small">
                      Leave blank to keep your current password. Or fill in all fields to change it.
                    </p>

                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                      />
                      <Form.Text className="text-muted">
                        Minimum 6 characters
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                      />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (currentUser) {
                            setFormData({
                              accountName: currentUser.accountName || '',
                              accountEmail: currentUser.accountEmail || '',
                              oldPassword: '',
                              newPassword: '',
                              confirmPassword: '',
                            });
                            setValidated(false);
                          }
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;