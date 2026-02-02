import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import categoryService from '../../../services/categoryService'; // Import category service

const NewsForm = ({ news, onSave, onCancel }) => {
  const [validated, setValidated] = useState(false);
  const [categories, setCategories] = useState([]); // State for categories
  const [formData, setFormData] = useState({
    id: null,
    newsTitle: '',
    headline: '',
    newsContent: '',
    newsSource: '',
    categoryID: '',
    newsStatus: 'Draft',
  });

  // Fetch categories for the dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories for form", error);
      }
    };
    loadCategories();
  }, []);

  // Effect to set form data when 'news' prop changes
  useEffect(() => {
    if (news) {
      setFormData({
        id: news.id,
        newsTitle: news.newsTitle || '',
        headline: news.headline || '',
        newsContent: news.newsContent || '',
        newsSource: news.newsSource || '',
        categoryID: news.categoryID || '',
        newsStatus: news.newsStatus || 'Draft',
      });
    } else {
      setFormData({
        id: null,
        newsTitle: '',
        headline: '',
        newsContent: '',
        newsSource: '',
        categoryID: '',
        newsStatus: 'Draft',
      });
    }
    setValidated(false);
  }, [news]);

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
      const currentUserID = 1;
      const now = new Date().toISOString();
      const dataToSend = {
        ...formData,
        categoryID: Number(formData.categoryID),
        ...(news ? { updatedByID: currentUserID, modifiedDate: now } 
                 : { createdByID: currentUserID, updatedByID: currentUserID, createdDate: now, modifiedDate: now }),
      };
      onSave(dataToSend);
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>News Title</Form.Label>
        <Form.Control
          type="text"
          name="newsTitle"
          value={formData.newsTitle}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Headline</Form.Label>
        <Form.Control
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">Please provide a headline.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="newsContent"
          value={formData.newsContent}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">Please provide content.</Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              name="newsSource"
              value={formData.newsSource}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              required
            >
              <option value="">Choose...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select name="newsStatus" value={formData.newsStatus} onChange={handleChange}>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
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

export default NewsForm;