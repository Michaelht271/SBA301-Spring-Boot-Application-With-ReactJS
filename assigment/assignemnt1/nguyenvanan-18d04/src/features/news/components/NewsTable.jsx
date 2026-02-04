import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const NewsTable = ({ newsList, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Headline</th>
          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {newsList.map((news) => (
          <tr key={news.newArticleId}>
            <td>{news.newArticleId}</td>
            <td>{news.newsTitle}</td>
            <td>{news.headLine}</td>
            <td>{news.category?.categoryName || 'Unassigned'}</td>
            <td>
              <Badge bg={news.newsStatus === 'Published' ? 'primary' : 'secondary'}>
                {news.newsStatus}
              </Badge>
            </td>
            <td>
              <Button variant="info" size="sm" className="me-2" onClick={() => onEdit(news)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(news.newArticleId)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NewsTable;