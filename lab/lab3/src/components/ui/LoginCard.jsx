// 3. LoginCard.jsx - Component Card wrapper
import { Card, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes

export function LoginCard({ error, onErrorClose, children }) {
    return (
        <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '400px', opacity: 0.95 }}>
            <Card.Body>
                <h2 className="text-center mb-4 text-primary">Sign In</h2>
                {error && (
                    <Alert
                        variant="danger"
                        dismissible
                        onClose={onErrorClose}
                    >
                        {error}
                    </Alert>
                )}
                {children}
            </Card.Body>
        </Card>
    );
}

// Add PropTypes for type checking
LoginCard.propTypes = {
    error: PropTypes.string,
    onErrorClose: PropTypes.func,
    children: PropTypes.node.isRequired,
};