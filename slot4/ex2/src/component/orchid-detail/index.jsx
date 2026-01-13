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

    return (
        <div className="orchid-detail">
            <h2>{name}</h2>
            <img src={image} alt={name} style={{ maxWidth: '300px' }} />
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> ${price.toFixed(2)}</p>
            {isSpecial && <p><em>This orchid is a special offer!</em></p>}
        </div>
    );
}