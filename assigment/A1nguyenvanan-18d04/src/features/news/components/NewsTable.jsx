import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner } from 'react-bootstrap';
import categoryService from '../../../services/categoryService';

const NewsTable = ({ newsList, onEdit, onDelete }) => {
    const [categories, setCategories] = useState({});
    const [loadingCategories, setLoadingCategories] = useState(true);

    // Load categories to map categoryId to categoryName
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const catList = await categoryService.getAll();
                const catMap = {};
                catList.forEach(cat => {
                    catMap[cat.categoryId] = cat.categoryName;
                });
                setCategories(catMap);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch (_error) {
            return dateString;
        }
    };

    const getCategoryName = (categoryId) => {
        if (loadingCategories) {
            return <Spinner animation="border" size="sm" />;
        }
        return categories[categoryId] || '-';
    };

    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Headline</th>
                {/*<th>Category</th>*/}
                {/*<th>Author</th>*/}
                {/*<th>Tags</th>*/}
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {newsList && newsList.map((news) => (
                <tr key={news.newArticleId}>
                    <td>{news.newArticleId}</td>
                    <td>{news.newsTitle}</td>
                    <td>{news.headLine || '-'}</td>
                    {/*<td>{getCategoryName(news.categoryId)}</td>*/}
                    {/*<td>{news.author?.accountName || '-'}</td>*/}
                    {/*<td>*/}
                    {/*    {news.tags && Array.isArray(news.tags) && news.tags.length > 0 ? (*/}
                    {/*        <div className="d-flex flex-wrap gap-1">*/}
                    {/*            {news.tags.map((tag) => (*/}
                    {/*                <Badge key={tag} bg="secondary" className="text-wrap">*/}
                    {/*                    {tag}*/}
                    {/*                </Badge>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    ) : (*/}
                    {/*        <span className="text-muted">-</span>*/}
                    {/*    )}*/}
                    {/*</td>*/}
                    <td>
                        {news.newsStatus === 'Active' || news.newsStatus === 'Published' ? (
                            <Badge bg="success">{news.newsStatus}</Badge>
                        ) : (
                            <Badge bg="warning">Draft</Badge>
                        )}
                    </td>
                    <td>{formatDate(news.createdDate || news.modifiedDate)}</td>
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