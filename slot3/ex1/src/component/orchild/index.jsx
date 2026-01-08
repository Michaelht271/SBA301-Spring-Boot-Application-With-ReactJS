import react from 'react';
import {Badge, Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";


export default function Orchid(
    {orchid}
)  {
    const {id, name, price, category, image, isSpecial, description} = orchid;
    return (
        <div>
            <Container>
                <Row>
                    <Col key={id} className={"mb-3"}>
                        <h2>Hoa phong lan
                        </h2>
                        <Card style={{ width: '18rem' }} className = "h-100 shadow-sm">
                            {isSpecial && (
                                <Badge bg="danger" className="position-absolute" style={{ top: '10px', right: '10px' }}>
                                    Special Offer
                                </Badge>
                            )}
                            <Card.Img variant="top"
                                      src={image}
                                      alt={name}
                                      style={{height:'200px', objectFit:'cover'}}
                            />
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>
                                    {description}
                                </Card.Text>
                                <Card.Text>
                                    {category}
                                </Card.Text>
                                <Card.Text>
                                    {price}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                                    </Row>
            </Container>
        </div>
    )
}





