import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner, FormControl, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import newsService from '../../services/newsService.js';
import authService from '../../services/authService.js';

const NewsHistoryPage = () => {
  const [myNewsList, setMyNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCachedUser();
    setCurrentUser(user);
    fetchMyNews();
  }, []);

  useEffect(() => {
    // Filter by search term
    const normalizedQuery = (searchTerm || '').trim().toLowerCase();
    const filtered = (myNewsList || []).filter((news) => {
      const title = (news?.newsTitle || '').toLowerCase();
      const headline = (news?.headLine || '').toLowerCase();
      return title.includes(normalizedQuery) || headline.includes(normalizedQuery);
    });
    setFilteredNews(filtered);
  }, [searchTerm, myNewsList]);

  const fetchMyNews = async () => {
    setLoading(true);
    try {
      const data = await newsService.getAll();
      // Filter news created by current user
      const user = authService.getCachedUser();
      if (user) {
        const myNews = (data || []).filter(
          news => news?.createdByID === user.accountId || news?.createdBy?.accountId === user.accountId
        );
        setMyNewsList(myNews);
      }
    } catch (error) {
      console.error("Failed to fetch news history:", error);
      toast.error("Failed to fetch your news history.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Active' || status === 1) {
      return <Badge bg="success">Active</Badge>;
    } else if (status === 'Draft' || status === 0) {
      return <Badge bg="warning">Draft</Badge>;
    }
    return <Badge bg="secondary">Unknown</Badge>;
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
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="mb-3">My News History</h1>
          {currentUser && (
            <p className="text-muted">
              Viewing all news articles created by <strong>{currentUser.accountName}</strong>
            </p>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <InputGroup>
            <FormControl
              placeholder="Search your news by title or headline"
              aria-label="Search news"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {filteredNews.length === 0 ? (
            <Card className="text-center p-5">
              <Card.Body>
                <h4>No news articles found</h4>
                <p className="text-muted">
                  {myNewsList.length === 0
                    ? "You haven't created any news articles yet."
                    : "No articles match your search."}
                </p>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Headline</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Modified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNews.map((news) => (
                      <tr key={news.newArticleId}>
                        <td>{news.newArticleId}</td>
                        <td>{news.newsTitle}</td>
                        <td>{news.headLine}</td>
                        <td>{news.category?.categoryName || 'N/A'}</td>
                        <td>{getStatusBadge(news.newsStatus)}</td>
                        <td>{news.createdDate ? new Date(news.createdDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{news.modifiedDate ? new Date(news.modifiedDate).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="bg-light">
            <Card.Body>
              <h6>Statistics</h6>
              <div className="row">
                <div className="col-md-3">
                  <strong>Total Articles:</strong> {myNewsList.length}
                </div>
                <div className="col-md-3">
                  <strong>Active:</strong>{' '}
                  {myNewsList.filter(n => n.newsStatus === 'Active' || n.newsStatus === 1).length}
                </div>
                <div className="col-md-3">
                  <strong>Draft:</strong>{' '}
                  {myNewsList.filter(n => n.newsStatus === 'Draft' || n.newsStatus === 0).length}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsHistoryPage;
