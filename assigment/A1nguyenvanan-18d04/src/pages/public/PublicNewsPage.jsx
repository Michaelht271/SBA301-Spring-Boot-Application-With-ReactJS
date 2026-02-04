import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Badge, FormControl, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import newsService from '../../services/newsService.js';

const PublicNewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchActiveNews();
  }, []);

  useEffect(() => {
    // Filter news by search term and active status
    const normalizedQuery = (searchTerm || '').trim().toLowerCase();
    const filtered = (newsList || []).filter((news) => {
      const title = (news?.newsTitle || '').toLowerCase();
      const headline = (news?.headLine || '').toLowerCase();
      const content = (news?.newsContent || '').toLowerCase();
      const isActive = news?.newsStatus === 'Active' || news?.newsStatus === 1;
      
      const matchesSearch = title.includes(normalizedQuery) || 
                           headline.includes(normalizedQuery) || 
                           content.includes(normalizedQuery);
      return matchesSearch && isActive;
    });
    setFilteredNews(filtered);
  }, [searchTerm, newsList]);

  const fetchActiveNews = async () => {
    setLoading(true);
    try {
      const data = await newsService.getAll();
      // Filter only active news articles
      const activeNews = (data || []).filter(
        news => news?.newsStatus === 'Active' || news?.newsStatus === 1
      );
      setNewsList(activeNews);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      toast.error("Failed to fetch news articles.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="mb-4">Latest News</h1>
          <InputGroup className="mb-4">
            <FormControl
              placeholder="Search news by title, headline, or content"
              aria-label="Search news"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {filteredNews.length === 0 ? (
        <Row>
          <Col md={12} className="text-center">
            <h4>No news articles available</h4>
            <p>Check back later for more updates.</p>
          </Col>
        </Row>
      ) : (
        <Row>
          {filteredNews.map((news) => (
            <Col md={6} lg={4} key={news.newArticleId} className="mb-4">
              <Card className="h-100 shadow-sm hover-shadow" style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Badge bg="success" className="mb-2">Active</Badge>
                  <Card.Title className="mt-2">{news.newsTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {news.headLine}
                  </Card.Subtitle>
                  <Card.Text className="text-truncate-3">
                    {news.newsContent}
                  </Card.Text>
                  <small className="text-muted">
                    <div>Source: {news.newsSource}</div>
                    <div>Category: {news.category?.categoryName || 'N/A'}</div>
                    <div>Author: {news.createdBy?.accountName || 'N/A'}</div>
                    <div>Published: {new Date(news.createdDate).toLocaleDateString()}</div>
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PublicNewsPage;

