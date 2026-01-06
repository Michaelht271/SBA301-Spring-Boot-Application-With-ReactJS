import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function Contact() {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h2 className="text-center mb-4">Contact Me</h2>

                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Write your message"
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Send Message
                            </Button>
                        </div>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

export default Contact
