import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { orchids } from '../../data/orchids'
import OrchidDetail from "../../component/orchid-detail/index.jsx";

export default function Orchid() {
    const { id } = useParams()
    const navigate = useNavigate()

    const orchid = orchids.find(o => String(o.id) === String(id))

    if (!orchid) {
        return (
            <Container className="py-5">
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={12} className="text-center">
                        <h2>Orchid not found</h2>
                        <p>The orchid you are looking for does not exist.</p>
                        <Button variant="primary" onClick={() => navigate('/')}>Go home</Button>
                    </Col>
                </Row>
            </Container>
        )
} else {
        return (<><OrchidDetail  orchid={orchid}/></>)
            }

}

