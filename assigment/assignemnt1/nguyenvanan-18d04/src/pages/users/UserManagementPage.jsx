import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import UserTable from '../../features/users/components/UserTable.jsx';
import UserForm from '../../features/users/components/UserForm.jsx';
import userService from '../../services/userService.js';

const UserManagementPage = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleDeleteUser = async (accountId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.remove(accountId);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        toast.error("Failed to delete user.");
      }
    }
  };
  
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

    if (userList.length === 0) {
      return (
        <div className="text-center mt-5">
          <h4>No users found.</h4>
          <p>Click 'Add New User' to get started.</p>
        </div>
      );
    }

    return <UserTable userList={userList} onEdit={handleShowModal} onDelete={handleDeleteUser} />;
  };

  return (
    <div>
      <h1 className="mb-4">User Management</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)} className="mb-3">
        Add New User
      </Button>

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