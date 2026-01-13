import { Container, Row, Col } from "react-bootstrap";
import OrchidCard from "../ui/OrchidCard.jsx";
import FilterSort from "../filter-sort/index.jsx";
import { useState, useEffect } from "react";

export default function Orchids({ orchids, searchTerm }) {
    const [sortOrder, setSortOrder] = useState("asc")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [filteredOrchids, setFilteredOrchids] = useState(orchids);

    useEffect(() => {        let result = [...orchids];
        if(selectedCategory) {
            result = result.filter(orchid => orchid.category === selectedCategory);

        }
        if(searchTerm) {
            result = result.filter(orchid =>
                orchid.orchidName.toLowerCase().includes(
                    searchTerm.toLowerCase()
                ));
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
        setFilteredOrchids(result);
    }, [orchids, selectedCategory, searchTerm, sortOrder]);

    const categories = [...new Set(orchids.map(o => o.category))];

    const onFilterChange = (category) => {
        setSelectedCategory(category);
    };
    const onSortChange = (sortOrder) => {
        setSortOrder(sortOrder);
    };

    return (
        <Container>
            {/*Use FilterSort component to filter and sort orchids by Category and price*/}
            <FilterSort
                categories={categories}
                onFilterChange={onFilterChange}
                onSortChange={onSortChange}
            />
            <Row>
                {filteredOrchids.map((orchid) => (
                    <Col key={orchid.id} md={3} className="mb-4">
                        <OrchidCard orchid={orchid} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
