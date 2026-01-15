import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom'
import { memo } from 'react'

function OrchidCard({ orchid }) {
    const {
        orchidName: name,
        category,
        image,
        isSpecial
    } = orchid

    // Ensure image path points to public root when data uses relative paths like "images/1.jpg"
    const resolvedImage = image && !/^https?:\/\//i.test(image)
        ? (image.startsWith('/') ? image : `/${image}`)
        : image

    // navigation to detail page instead of in-place modal
    return (
        <>
            {/* CARD */}
            <Card className=" shadow-sm p-4">
                {isSpecial && (
                    <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                        Special Offer
                    </Badge>
                )}
                <Card.Img
                    variant="top"
                    src={resolvedImage}
                    alt={name}
                    loading="lazy"
                    style={{height: '200px',  objectFit: 'cover'}}
                />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text><strong>{category}</strong></Card.Text>

                    {/* BUTTON OPEN POPUP */}
                    <Button as={Link} to={`/orchid/${orchid.id}`} variant="primary">
                        View Details
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default memo(OrchidCard)