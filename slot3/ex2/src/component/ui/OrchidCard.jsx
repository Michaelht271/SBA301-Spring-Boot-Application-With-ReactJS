import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import {Button} from "react-bootstrap";

export default function OrchidCard({ orchid }) {
    const {
        id,
        orchidName: name,   // ✅ map tên
        category,
        image,
        isSpecial,
        description
    } = orchid

    return (
        <Card className="h-100 shadow-sm position-relative">
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

                <Card.Text><strong>{category}</strong></Card.Text>
                <Button variant={"primary"}> View Detail</Button>
            </Card.Body>
        </Card>
    )
}
