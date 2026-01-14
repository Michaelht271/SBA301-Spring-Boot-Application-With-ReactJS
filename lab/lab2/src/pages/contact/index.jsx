import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Validator from "../../utils/validator.js";
import contactRules from "../../utils/contactRules.js";
import ConfirmModal from "../../component/modal/ConfirmModal.jsx";

const validator = new Validator(contactRules)

function Contact() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    })

    const [errors, setErrors] = useState({})
    const [showConfirm, setShowConfirm] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        const newForm = { ...form, [name]: value }
        setForm(newForm)

        // validate only the changed field and update errors accordingly
        const fieldError = validator.validateField(name, newForm)
        setErrors(prev => {
            const next = { ...prev }
            if (fieldError) next[name] = fieldError
            else delete next[name]
            return next
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validator.validate(form)
        setErrors(validationErrors)

        if (validator.isValid) {
            // show confirmation modal; actual submit happens on confirm
            setShowConfirm(true)
        }
    }

    const handleConfirm = (data) => {
        // Actual submit action: currently just logs and resets form
        console.log('Submit data:', data)
        setShowConfirm(false)
        setForm({ firstName: '', lastName: '', phone: '', email: '', message: '' })
        setErrors({})
    }

    return (
        <Container className="py-5 justify-center">
            <h2 className="mb-4 text-center">Contact Us</h2>
            <Row className="justify-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                name="firstName"
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                                value={form.firstName}
                            />
                            <Form.Control.Feedback type="invalid" >
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                name="lastName"
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                                value={form.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                name="phone"
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                                value={form.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                value={form.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="message"
                                onChange={handleChange}
                                isInvalid={!!errors.message}
                                value={form.message}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit">Send</Button>
                    </Form>

                    {/* Confirm modal shown when validation passes (use single `config` prop) */}
                    <ConfirmModal
                        show={showConfirm}
                        onHide={() => setShowConfirm(false)}
                        config={{
                            title: "Confirm send",
                            body: "Are you sure you want to send this message?",
                            onConfirm: handleConfirm,
                            data: form // pass the single data argument (form) to onConfirm
                        }}
                    />


                </Col>
            </Row>
        </Container>
    )
}

export default Contact
