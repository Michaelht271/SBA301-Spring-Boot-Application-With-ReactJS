import { Container, Row, Col } from "react-bootstrap";
import OrchidCard from "../../components/ui/OrchidCard.jsx";
import FilterSort from "./components/FilterSort.jsx";
import { useMemo, useCallback, useReducer } from "react";
import PropTypes from 'prop-types'; // Import PropTypes

// Action types for the reducer
const ACTIONS = {
    SET_SORT_ORDER: 'set-sort-order',
    SET_CATEGORY: 'set-category',
}

// Reducer function to manage sorting and filtering state
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_SORT_ORDER:
            return { ...state, sortOrder: action.payload };
        case ACTIONS.SET_CATEGORY:
            return { ...state, selectedCategory: action.payload };
        default:
            return state;
    }
}

const initialState = {
    sortOrder: "asc",
    selectedCategory: ""
};

export default function Orchids({ orchids, searchTerm }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const filteredOrchids = useMemo(() => {
        let result = [...orchids];
        if(state.selectedCategory) {
            result = result.filter(orchid => orchid.category === state.selectedCategory);
        }
        if(searchTerm) {
            result = result.filter(orchid =>
                orchid.orchidName.toLowerCase().includes(
                    searchTerm.toLowerCase()
                ));
        }
        switch (state.sortOrder) {
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
    }, [orchids, state.selectedCategory, searchTerm, state.sortOrder]);

    const categories = useMemo(() => [...new Set(orchids.map(o => o.category))], [orchids]);

    const onFilterChange = useCallback((category) => {
        dispatch({ type: ACTIONS.SET_CATEGORY, payload: category });
    }, []);

    const onSortChange = useCallback((sortOrder) => {
        dispatch({ type: ACTIONS.SET_SORT_ORDER, payload: sortOrder });
    }, []);

    return (
        <Container>
            <FilterSort
                categories={categories}
                onFilterChange={onFilterChange}
                onSortChange={onSortChange}
                currentCategory={state.selectedCategory}
                currentSort={state.sortOrder}
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

// Add PropTypes for type checking
Orchids.propTypes = {
    orchids: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        orchidName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        isSpecial: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
    })).isRequired,
    searchTerm: PropTypes.string,
};