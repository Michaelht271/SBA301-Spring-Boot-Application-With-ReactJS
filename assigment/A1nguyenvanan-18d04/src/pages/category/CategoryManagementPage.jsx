import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner, FormControl, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CategoryTable from '../../features/categories/components/CategoryTable.jsx';
import CategoryForm from '../../features/categories/components/CategoryForm.jsx';
import categoryService from '../../services/categoryService.js';

const CategoryManagementPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategoryList(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (category = null) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCategory(null);
  };

  const handleSaveCategory = async (category) => {
    try {
      console.log('Received category data:', category); // Debug log
      console.log('Category ID:', category.categoryId); // Debug log
      if (category.categoryId) {
        console.log('Updating category with ID:', category.categoryId); // Debug log
        await categoryService.update(category.categoryId, category);
        toast.success("Category updated successfully!");
      } else {
        console.log('Creating new category'); // Debug log
        await categoryService.create(category);
        toast.success("Category created successfully!");
      }
      fetchCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error("Failed to save category.");
    }
    handleCloseModal();
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.remove(id);
        toast.success("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        console.error("Failed to delete category:", error);
        toast.error("Failed to delete category.");
      }
    }
  };

  // Filter categories by search term
  const normalizedQuery = (searchTerm || '').trim().toLowerCase();
  const filteredCategories = (categoryList || []).filter((category) => {
    const name = (category?.categoryName || '').toLowerCase();
    const description = (category?.categoryDescription || '').toLowerCase();
    return name.includes(normalizedQuery) || description.includes(normalizedQuery);
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

    if (filteredCategories.length === 0) {
      return (
        <div className="text-center mt-5">
          <h4>No categories found.</h4>
          <p>{categoryList.length === 0 ? "Click 'Add New Category' to get started." : "Try a different search term."}</p>
        </div>
      );
    }

    return <CategoryTable categoryList={filteredCategories} onEdit={handleShowModal} onDelete={handleDeleteCategory} />;
  };

  return (
    <div>
      <h1 className="mb-4">Category Management</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal(null)}>
          Add New Category
        </Button>
        <InputGroup className="w-25">
          <FormControl
            placeholder="Search categories"
            aria-label="Search categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {renderContent()}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentCategory ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm category={currentCategory} onSave={handleSaveCategory} onCancel={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoryManagementPage;

