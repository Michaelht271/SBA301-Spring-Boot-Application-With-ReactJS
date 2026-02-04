import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import authService from '../../../services/authService';

const UserTable = ({ userList, onEdit, onDelete }) => {
    const getRoleBadge = (user) => {
        const normalized = authService.getUserRoles(user);
        // const normalized = roleLabel.toUpperCase();

        if (normalized === 'ADMIN') {
            return <Badge bg="danger">Admin</Badge>;
        }
        if (normalized === 'STAFF') {
            return <Badge bg="info">Staff</Badge>;
        }
        return <Badge bg="secondary">{normalized}</Badge>;
    };

    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>Account Name</th>
                <th>Account Email</th>
                <th>Account Role</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {userList && userList.map((user) => (
                <tr key={user.accountId}>
                    <td>{user.accountId}</td>
                    <td>{user.accountName}</td>
                    <td>{user.accountEmail}</td>
                    <td>
                        {getRoleBadge(user)}
                    </td>
                    <td>
                        <Button variant="info" size="sm" className="me-2" onClick={() => onEdit(user)}>
                            Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => onDelete(user.accountId)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default UserTable;