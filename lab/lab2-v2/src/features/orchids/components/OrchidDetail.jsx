 // Import PropTypes

import PropTypes from "prop-types";

 export default function OrchidDetail({ orchid }) {

    if (!orchid) {
        return <div>Orchid not found</div>;
    }

    const {
        orchidName: name,
        category,
        image,
        description,
        price,
        isSpecial
    } = orchid;

    // Normalize image path so public/images/... is referenced as /images/...
    const resolvedImage = image && !/^https?:\/\//i.test(image)
        ? (image.startsWith('/') ? image : `/${image}`)
        : image

    return (
        <div className="orchid-detail">
            <h2>{name}</h2>
            <img src={resolvedImage} alt={name} style={{ maxWidth: '300px' }} />
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> ${price.toFixed(2)}</p>
            {isSpecial && <p><em>This orchid is a special offer!</em></p>}
        </div>
    );
}

// Add PropTypes for type checking
OrchidDetail.propTypes = {
    orchid: PropTypes.shape({
        id: PropTypes.string.isRequired,
        orchidName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        isSpecial: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};