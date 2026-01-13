import {Col, Form, Row} from "react-bootstrap";

export default function FilterSort({categories, onFilterChange, onSortChange}) {
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
                            <Form.Select onChange={handleFilterChange} defaultValue="">
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
                                    <Form.Select onChange={handleSortChange} defaultValue="asc">
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