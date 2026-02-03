import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [validated, setValidated] = useState(false); // New state for validation
  const [formData, setFormData] = useState({
    id: null,
    categoryName: '',
    categoryDescription: '',
    parentCategoryID: '',
    isActive: true,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        categoryName: category.categoryName || '',
        categoryDescription: category.categoryDescription || '',
        parentCategoryID: category.parentCategoryID || '',
        isActive: category.isActive,
      });
    } else {
      setFormData({
        id: null,
        categoryName: '',
        categoryDescription: '',
        parentCategoryID: '',
        isActive: true,
      });
    }
    setValidated(false); // Reset validation on form load
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const dataToSend = {
        ...formData,
        parentCategoryID: formData.parentCategoryID === '' ? null : Number(formData.parentCategoryID),
      };
      onSave(dataToSend);
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a category name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="categoryDescription"
          value={formData.categoryDescription}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a description.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Parent Category ID</Form.Label>
        <Form.Control
          type="number"
          name="parentCategoryID"
          value={formData.parentCategoryID}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="is-active-switch"
          label="Active"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
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

export default CategoryForm;