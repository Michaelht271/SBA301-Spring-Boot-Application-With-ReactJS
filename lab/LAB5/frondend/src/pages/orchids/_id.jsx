import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Col, Container, Row, Spinner, Button, Alert } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

import { useGetOrchidByIdQuery } from "../../redux/api/orchidApiSlice.js";
import Navbar from "../../components/navbar/index.jsx";
import '../../components/orchid/orchid-detail.css'; // Keep custom styles if any are still needed

export default function OrchidDetailPage() {
    const { id } = useParams();
    const { data: orchid, isLoading, isError } = useGetOrchidByIdQuery(id);

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (isError || !orchid) {
        return (
            <>
                <Navbar />
                <Container className="text-center my-5">
                    <Toaster />
                    <Alert variant="danger">
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            The orchid you are looking for was not found or an error occurred.
                        </p>
                    </Alert>
                    <Link to="/" className="btn btn-primary mt-3">
                        ← Back to list
                    </Link>
                </Container>
            </>
        );
    }

    return (
        <>
            <Container className="my-5">
                <Toaster />
                <Row className="justify-content-center">
                    <Col md={12} lg={8}>
                        <Card>
                            <Row g={0}>
                                <Col md={5}>
                                    <Card.Img src={orchid.orchidURL} alt={orchid.orchidName} style={{ objectFit: 'cover', height: '100%' }} />
                                </Col>
                                <Col md={7}>
                                    <Card.Body className="p-4">
                                        <Card.Title as="h2" className="mb-3">{orchid.orchidName}</Card.Title>

                                        <p>
                                            <strong>Category:</strong> {orchid.orchidCategory?.categoryName || 'N/A'}
                                        </p>

                                        <p>
                                            <strong>Origin:</strong>
                                            {orchid.natural ? (
                                                <span className="badge bg-success ms-2">Natural</span>
                                            ) : (
                                                <span className="badge bg-warning text-dark ms-2">Industry</span>
                                            )}
                                        </p>

                                        {orchid.attractive && (
                                            <p className="mb-4">
                                                <strong>Status:</strong>
                                                <span className="badge bg-info text-dark ms-2">✨ Attractive</span>
                                            </p>
                                        )}

                                        {orchid.orchidDescription && (
                                            <>
                                                <strong>Description:</strong>
                                                <p className="mt-1">{orchid.orchidDescription}</p>
                                            </>
                                        )}


                                        <div className="d-flex justify-content-end gap-2 mt-4">
                                            <Button variant="secondary" as={Link} to="/">
                                                ← Back to List
                                            </Button>
                                            <Button variant="primary" as={Link} to={`/edit/${id}`}>
                                                Edit
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
