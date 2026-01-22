import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { getOrchidById } from '../../services/apis.js'
import OrchidDetailComponent from '../../features/orchids/components/OrchidDetail.jsx' // Import the reusable component

export default function OrchidDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [orchid, setOrchid] = useState(null)

    useEffect(() => {
        getOrchidById(id).then(data => {
            setOrchid(data);
        });
    }, [id]);

    return (
        <Container className="py-5 w-full">
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col md={12}>
                    <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Back</Button>
                    {orchid && <OrchidDetailComponent orchid={orchid} />}
                </Col>
            </Row>
        </Container>
    )
}

