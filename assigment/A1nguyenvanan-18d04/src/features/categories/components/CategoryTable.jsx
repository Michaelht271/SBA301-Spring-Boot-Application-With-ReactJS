import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const CategoryTable = ({ categoryList, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Parent Category ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categoryList.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.categoryName}</td>
            <td>{category.categoryDescription}</td>
            <td>{category.parentCategoryID || 'None'}</td>
            <td>
              {category.isActive ? (
                <Badge bg="success">Active</Badge>
              ) : (
                <Badge bg="secondary">Inactive</Badge>
              )}
            </td>
            <td>
              <Button variant="info" size="sm" className="me-2" onClick={() => onEdit(category)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(category.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;