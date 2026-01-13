import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { orchids } from '../../data/orchids'

export default function OrchidDetail() {
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
    }

    const { orchidName, image, description, category, price, isSpecial } = orchid

    // Resolve image path so that paths like "images/1.jpg" point to the public folder ("/images/1.jpg")
    const resolvedImage = image && !/^https?:\/\//i.test(image)
        ? (image.startsWith('/') ? image : `/${image}`)
        : image

    return (
        <Container className="py-5 w-full">
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col md={12}>
                    <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Back</Button>

                    <Card>
                        {isSpecial && (
                            <Card.Header style={{ backgroundColor: '#dc3545', color: '#fff' }}>
                                Special Offer
                            </Card.Header>
                        )}
                        <Card.Img variant="top" src={resolvedImage} alt={orchidName} style={{height: 400, padding: 8, borderRadius: 20, objectFit: 'cover'}} />
                        <Card.Body>
                            <Card.Title>{orchidName}</Card.Title>
                            <Card.Text><strong>Category:</strong> {category}</Card.Text>
                            <Card.Text>{description}</Card.Text>
                            {typeof price !== 'undefined' && (
                                <Card.Text className="mt-3"><strong>Price:</strong> ${price}</Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
