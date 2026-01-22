import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function OrchidForm({ orchid, onFieldChange, validationErrors = {} }) {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={orchid.orchidName || ''}
                    onChange={(e) => onFieldChange('orchidName', e.target.value)}
                    isInvalid={!!validationErrors.orchidName}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.orchidName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text"
                    value={orchid.category || ''}
                    onChange={(e) => onFieldChange('category', e.target.value)}
                    isInvalid={!!validationErrors.category}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.category}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    value={orchid.price || ''}
                    onChange={(e) => onFieldChange('price', e.target.value)}
                    isInvalid={!!validationErrors.price}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.price}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                    type="text"
                    value={orchid.image || ''}
                    onChange={(e) => onFieldChange('image', e.target.value)}
                    isInvalid={!!validationErrors.image}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.image}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Special"
                    checked={orchid.isSpecial || false}
                    onChange={(e) => onFieldChange('isSpecial', e.target.checked)}
                />
            </Form.Group>
        </Form>
    );
}

OrchidForm.propTypes = {
    orchid: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.object,
};
