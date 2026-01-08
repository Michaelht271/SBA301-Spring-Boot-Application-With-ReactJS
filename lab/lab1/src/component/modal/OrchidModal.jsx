import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import PropTypes from "prop-types"

export default function OrchidModal({ show, onHide, detail }) {
    if (!detail) return null

    const {
        orchidName,
        image,
        description,
        category
    } = detail

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{orchidName}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img
                    src={image}
                    alt={orchidName}
                    className="img-fluid rounded mb-3"
                />
                <p>{description}</p>
                <p><strong>{category}</strong></p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide}> Save Changes </Button>
            </Modal.Footer>
        </Modal>
    )
}

OrchidModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    detail: PropTypes.object.isRequired
}
