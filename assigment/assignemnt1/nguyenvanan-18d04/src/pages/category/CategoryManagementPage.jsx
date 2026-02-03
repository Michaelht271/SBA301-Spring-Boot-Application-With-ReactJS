import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CategoryTable from '../../features/categories/components/CategoryTable.jsx';
import CategoryForm from '../../features/categories/components/CategoryForm.jsx';
import categoryService from '../../services/categoryService.js';

const CategoryManagementPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

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
      if (category.id) {
        await categoryService.update(category.id, category);
        toast.success("Category updated successfully!");
      } else {
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

    if (categoryList.length === 0) {
      return (
        <div className="text-center mt-5">
          <h4>No categories found.</h4>
          <p>Click 'Add New Category' to get started.</p>
        </div>
      );
    }

    return <CategoryTable categoryList={categoryList} onEdit={handleShowModal} onDelete={handleDeleteCategory} />;
  };

  return (
    <div>
      <h1 className="mb-4">Category Management</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)} className="mb-3">
        Add New Category
      </Button>

      {renderContent()}

      <Modal show={showModal} onHide={handleCloseModal}>
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