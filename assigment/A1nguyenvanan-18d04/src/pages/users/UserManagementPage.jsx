import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner, FormControl, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import UserForm from '../../features/users/components/UserForm.jsx';
import userService from '../../services/userService.js';
import UserTable from '../../features/users/components/UserTable.jsx';
const UserManagementPage = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUserList(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (user = null) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleSaveUser = async (user) => {
    try {
      if (user.accountId) {
        await userService.update(user.accountId, user);
        toast.success("User updated successfully!");
      } else {
        await userService.create(user);
        toast.success("User created successfully!");
      }
      fetchUsers();
    } catch (error) {
      console.error("Failed to save user:", error);
      toast.error("Failed to save user.");
    }
    handleCloseModal();
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.remove(id);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        toast.error("Failed to delete user.");
      }
    }
  };

  // Filter users by search term
  const normalizedQuery = (searchTerm || '').trim().toLowerCase();
  const filteredUsers = (userList || []).filter((user) => {
    const name = (user?.accountName || '').toLowerCase();
    const email = (user?.accountEmail || '').toLowerCase();
    const role = (user?.accountRole || '').toLowerCase();
    return name.includes(normalizedQuery) || email.includes(normalizedQuery) || role.includes(normalizedQuery);
  });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <div className="text-center mt-5">
          <h4>No users found.</h4>
          <p>{userList.length === 0 ? "Click 'Add New User' to get started." : "Try a different search term."}</p>
        </div>
      );
    }

    return <UserTable userList={filteredUsers} onEdit={handleShowModal} onDelete={handleDeleteUser} />;
  };

  return (
    <div>
      <h1 className="mb-4">User Management</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal(null)}>
          Add New User
        </Button>
        <InputGroup className="w-25">
          <FormControl
            placeholder="Search by name, email, or role"
            aria-label="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {renderContent()}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm user={currentUser} onSave={handleSaveUser} onCancel={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManagementPage;