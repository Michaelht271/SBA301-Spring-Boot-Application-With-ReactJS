import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UserTable = ({ userList, onEdit, onDelete }) => {
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
                  {user.roles?.map(role => role.replace('ROLE_', '')).join(', ')}
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