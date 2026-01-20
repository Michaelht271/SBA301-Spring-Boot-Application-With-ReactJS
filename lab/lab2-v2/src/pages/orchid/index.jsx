import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { orchids } from '../../data/orchids'
import OrchidDetailComponent from '../../features/orchids/components/OrchidDetail.jsx' // Import the reusable component

export default function OrchidDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const orchid = orchids.find(o => String(o.id) === String(id))

    return (
        <Container className="py-5 w-full">
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col md={12}>
                    <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Back</Button>
                    <OrchidDetailComponent orchid={orchid} />
                </Col>
            </Row>
        </Container>
    )
}

