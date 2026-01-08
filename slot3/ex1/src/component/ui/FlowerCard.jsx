import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

export default function FlowerCard({ orchid }) {
    const { id, name, price, category, image, isSpecial, description } = orchid

    return (
        <Card style={{ width: '18rem' }} className="h-100 shadow-sm position-relative">
            {isSpecial && (
                <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                    Special Offer
                </Badge>
            )}

            <Card.Img
                variant="top"
                src={image}
                alt={name}
                style={{ height: '200px', objectFit: 'cover' }}
            />

            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text><strong>{category}</strong></Card.Text>
                <Card.Text className="fw-bold">${price}</Card.Text>
            </Card.Body>
        </Card>
    )
}
