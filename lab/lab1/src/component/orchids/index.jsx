import { Container, Row, Col } from "react-bootstrap"
import { orchids } from "../../data/orchids"
import OrchidCard from "../ui/OrchidCard.jsx"

export default function Orchid() {
    return (
        <Container>
            <Row>
                {orchids.map((orchid) => (
                    <Col key={orchid.id} md={3} className="mb-4">
                        <OrchidCard orchid={orchid} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
