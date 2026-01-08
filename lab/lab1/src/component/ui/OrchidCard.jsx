import { useState } from "react"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import OrchidModal from "../modal/OrchidModal.jsx"


export default function OrchidCard({ orchid }) {
    const {
        orchidName: name,
        category,
        image,
        isSpecial,
        description
    } = orchid

    const [show, setShowModal] = useState(false)
    return (
        <>
            {/* CARD */}
            <Card className=" shadow-sm  p-4">
                {isSpecial && (
                    <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                        Special Offer
                    </Badge>
                )}

                <Card.Img
                    variant="top"
                    src={image}
                    alt={name}
                    style={{height: '200px', objectFit: 'cover'}}
                />

                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text><strong>{category}</strong></Card.Text>

                    {/* BUTTON OPEN POPUP */}
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        View Details
                    </Button>
                </Card.Body>
            </Card>

            {/* POPUP / MODAL */}
            <OrchidModal show={show}
                         onHide={() => setShowModal(false)}
                         detail={orchid}

                        />
        </>
    )
}
