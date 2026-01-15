import { Container, Row, Col } from "react-bootstrap";
import OrchidCard from "../ui/OrchidCard.jsx";
import FilterSort from "../filter-sort/index.jsx";
import { useState, useMemo, useCallback } from "react";

export default function Orchids({ orchids, searchTerm }) {
    const [sortOrder, setSortOrder] = useState("asc")
    const [selectedCategory, setSelectedCategory] = useState("")

    const filteredOrchids = useMemo(() => {
        let result = [...orchids];
        if(selectedCategory) {
            result = result.filter(orchid => orchid.category === selectedCategory);
        }
        if(searchTerm) {
            result = result.filter(orchid =>
                orchid.orchidName.toLowerCase().includes(
                    searchTerm.toLowerCase()
                ));useMemo
        }
        switch (sortOrder) {
            case "asc":
                result.sort((a, b) =>
                    a.orchidName.localeCompare(b.orchidName)
                );
                break;

            case "desc":
                result.sort((a, b) =>
                    b.orchidName.localeCompare(a.orchidName)
                );
                break;

            case "increase":
                result.sort((a, b) => a.price - b.price);
                break;

            case "decrease":
                result.sort((a, b) => b.price - a.price);
                break;

            default:
                break;
        }
        return result;
    }, [orchids, selectedCategory, searchTerm, sortOrder]);

    const categories = useMemo(() => [...new Set(orchids.map(o => o.category))], [orchids]);

    const onFilterChange = useCallback((category) => {
        setSelectedCategory(category);
    }, []);

    const onSortChange = useCallback((sortOrder) => {
        setSortOrder(sortOrder);
    }, []);

    return (
        <Container>
            {/*Use FilterSort component to filter and sort orchids by Category and price*/}
            <FilterSort
                categories={categories}
                onFilterChange={onFilterChange}
                onSortChange={onSortChange}
                currentCategory={selectedCategory}
                currentSort={sortOrder}
            />
            {filteredOrchids.length === 0 ? (
                <div className="alert alert-warning text-center" role="alert">
                    No orchids found matching your criteria.
                </div>
            ) : (
                <Row>
                    {filteredOrchids.map((orchid) => (
                        <Col key={orchid.id} md={3} className="mb-4">
                            <OrchidCard orchid={orchid} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}