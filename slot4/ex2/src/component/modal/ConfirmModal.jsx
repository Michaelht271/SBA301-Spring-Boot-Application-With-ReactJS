import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import PropTypes from "prop-types"

/**
 * Universal modal that supports two modes:
 * - detail-mode (pass `detail` object) to show an item's details and a primary action
 * - confirm-mode (no `detail`) to show a confirmation dialog using `config`
 *
 * `config.onConfirm` will receive one argument:
 * - confirm-mode: `config.data`
 * - detail-mode: the `detail` object
 */
export default function ConfirmModal({ show, onHide, config = {}, detail = null }) {
    // Merge defaults with any user-provided config
    const cfg = {
        title: "Confirm",
        body: "Are you sure?",
        onConfirm: null,
        // single value forwarded to onConfirm in confirm-mode
        data: null,
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
        confirmVariant: "danger",
        // detail-mode label
        primaryLabel: "Save Changes",
        ...config
    }

    const isDetail = Boolean(detail)

    const close = () => {
        if (typeof onHide === 'function') onHide()
    }

    const confirm = () => {
        if (typeof cfg.onConfirm === 'function') cfg.onConfirm(cfg.data)
        close()
    }

    const primary = () => {
        if (isDetail && typeof cfg.onConfirm === 'function') cfg.onConfirm(detail)
        else close()
    }

    if (isDetail) {
        const { orchidName, image, description, category } = detail || {}
        return (
            <Modal show={show} onHide={close} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{orchidName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {image && (
                        <img src={image} alt={orchidName || ''} className="img-fluid rounded mb-3" />
                    )}
                    {description && <p>{description}</p>}
                    {category && <p><strong>{category}</strong></p>}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={primary}>
                        {cfg.primaryLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    // Confirm mode
    return (
        <Modal show={show} onHide={close} centered>
            <Modal.Header closeButton>
                <Modal.Title>{cfg.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {typeof cfg.body === 'string' ? <p>{cfg.body}</p> : cfg.body}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    {cfg.cancelLabel}
                </Button>
                <Button variant={cfg.confirmVariant} onClick={confirm}>
                    {cfg.confirmLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    config: PropTypes.shape({
        title: PropTypes.node,
        body: PropTypes.node,
        onConfirm: PropTypes.func,
        data: PropTypes.any,
        confirmLabel: PropTypes.node,
        cancelLabel: PropTypes.node,
        confirmVariant: PropTypes.string,
        primaryLabel: PropTypes.node
    }),
    detail: PropTypes.shape({
        orchidName: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string
    })
}
