import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import NewsTable from '../../features/news/components/NewsTable.jsx';
import NewsForm from '../../features/news/components/NewsForm.jsx';
import newsService from '../../services/newsService.js';

const NewsManagementPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await newsService.getAll();
      setNewsList(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      toast.error("Failed to fetch news articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (news = null) => {
    setCurrentNews(news);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentNews(null);
  };

  const handleSaveNews = async (news) => {
    try {
      if (news.id) {
        await newsService.update(news.id, news);
        toast.success("News article updated successfully!");
      } else {
        await newsService.create(news);
        toast.success("News article created successfully!");
      }
      fetchNews();
    } catch (error) {
      console.error("Failed to save news:", error);
      toast.error("Failed to save news article.");
    }
    handleCloseModal();
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await newsService.remove(id);
        toast.success("News article deleted successfully!");
        fetchNews();
      } catch (error) {
        console.error("Failed to delete news:", error);
        toast.error("Failed to delete news article.");
      }
    }
  };

  const filteredNews = newsList.filter(news =>
    news.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

    if (filteredNews.length === 0) {
      return (
        <div className="text-center mt-5">
          <h4>No news articles found.</h4>
          <p>Click 'Add New News' to get started or try a different search term.</p>
        </div>
      );
    }

    return <NewsTable newsList={filteredNews} onEdit={handleShowModal} onDelete={handleDeleteNews} />;
  };

  return (
    <div>
      <h1 className="mb-4">News Management</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal(null)}>
          Add New News
        </Button>
        <InputGroup className="w-25">
          <FormControl
            placeholder="Search news by title or headline"
            aria-label="Search news"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {renderContent()}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentNews ? 'Edit News' : 'Add News'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewsForm news={currentNews} onSave={handleSaveNews} onCancel={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewsManagementPage;