import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Orchid() {
    const {id} = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
    const [orchid, setOrchid] = useState(null);

    useEffect(() => {
        const fetchOrchid = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/orchids/${id}`);
                setOrchid(response.data);
            } catch (error) {
                console.error("Error fetching orchid data:", error);
            }
        };

        fetchOrchid();
    }, [id, baseUrl]);

    if (!orchid) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={orchid.orchidURL}/>
                        <Card.Body>
                            <Card.Title>{orchid.orchidName}</Card.Title>
                            <Card.Text>
                                {orchid.isNatural ? (
                                    <span className="badge text-bg-success">Natural</span>
                                ) : (
                                    <span className="badge text-bg-warning">Industry</span>
                                )}
                            </Card.Text>
                            <Link to="/" className="btn btn-primary">
                                Back to list
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
