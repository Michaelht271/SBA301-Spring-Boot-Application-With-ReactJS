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
          <th>Category ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {newsList.map((news) => (
          <tr key={news.id}>
            <td>{news.id}</td>
            <td>{news.newsTitle}</td>
            <td>{news.headline}</td>
            <td>{news.categoryID}</td>
            <td>
              <Badge bg={news.newsStatus === 'Published' ? 'primary' : 'secondary'}>
                {news.newsStatus}
              </Badge>
            </td>
            <td>
              <Button variant="info" size="sm" className="me-2" onClick={() => onEdit(news)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(news.id)}>
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