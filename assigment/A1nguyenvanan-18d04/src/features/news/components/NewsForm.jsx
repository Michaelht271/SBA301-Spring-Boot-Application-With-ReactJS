import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Badge } from 'react-bootstrap';
import categoryService from '../../../services/categoryService'; // Import category service

const NewsForm = ({ news, onSave, onCancel }) => {
    const [validated, setValidated] = useState(false);
    const [categories, setCategories] = useState([]); // State for categories
    const [tagInput, setTagInput] = useState('');
    const [formData, setFormData] = useState({
        newArticleId: null,
        newsTitle: '',
        headLine: '',
        newsContent: '',
        newsSource: '',
        categoryId: '',
        newsStatus: 'Draft',
        tags: [],
    });

    // Fetch categories for the dropdown
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryService.getAll();
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
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                newArticleId: news.newArticleId,
                newsTitle: news.newsTitle || '',
                headLine: news.headLine || '',
                newsContent: news.newsContent || '',
                newsSource: news.newsSource || '',
                categoryId: news.categoryId || '',
                newsStatus: news.newsStatus || 'Draft',
                tags: news.tags || [],
            });
        } else {
            setFormData({
                newArticleId: null,
                newsTitle: '',
                headLine: '',
                newsContent: '',
                newsSource: '',
                categoryId: '',
                newsStatus: 'Draft',
                tags: [],
            });
        }
        setTagInput('');
        setValidated(false);
    }, [news]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const addTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            setFormData((prevData) => ({
                ...prevData,
                tags: [...prevData.tags, trimmedTag],
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: prevData.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
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
                categoryId: Number(formData.categoryId),
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
                    name="headLine"
                    value={formData.headLine}
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
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose...</option>
                            {(categories || []).map(cat => (
                                <option key={cat.categoryId || cat.id} value={cat.categoryId || cat.id}>
                                    {cat.categoryName || cat.name}
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
                    <option value="Active">Active</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <div className="d-flex gap-2 mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Enter tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                    />
                    <Button variant="outline-primary" onClick={addTag} type="button">
                        Add
                    </Button>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                        <Badge key={tag} bg="info" className="p-2">
                            {tag}
                            <button
                                type="button"
                                className="btn-close btn-close-white ms-2"
                                onClick={() => removeTag(tag)}
                                style={{ fontSize: '0.7rem' }}
                            />
                        </Badge>
                    ))}
                </div>
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