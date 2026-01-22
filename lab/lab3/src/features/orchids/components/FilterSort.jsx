import {Col, Form, Row} from "react-bootstrap";
import PropTypes from 'prop-types'; // Import PropTypes

export default function FilterSort({categories, onFilterChange, onSortChange, currentCategory, currentSort}) {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    }
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    }
    return (
        <Form className="mb-4">
            <Row>
               <Col>
                     <Form.Group controlId="filter">
                            <Form.Label>Filter by Category</Form.Label>
                            <Form.Select onChange={handleFilterChange} value={currentCategory}>
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                </Col>
                <Col>
                        <Form.Group controlId="sort">
                                <Form.Label >Sort by Name</Form.Label>
                                    <Form.Select onChange={handleSortChange} value={currentSort}>
                                        <option value="asc">A to Z</option>
                                        <option value="desc">Z to A</option>
                                        <option value={"increase"}>Increase Price</option>
                                        <option value={"decrease"}>Decrease Price</option>
                                    </Form.Select>
                        </Form.Group>

               </Col>
            </Row>
        </Form>
    )
}

// Add PropTypes for type checking
FilterSort.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
    currentSort: PropTypes.string.isRequired,
};