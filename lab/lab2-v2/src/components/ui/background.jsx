import PropTypes from 'prop-types'; // Import PropTypes

export default function Background({ children }) {
    return (
        <div style={{
            backgroundImage: 'url(/images/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 56px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {children}
        </div>
    );
}

// Add PropTypes for type checking
Background.propTypes = {
    children: PropTypes.node.isRequired,
};