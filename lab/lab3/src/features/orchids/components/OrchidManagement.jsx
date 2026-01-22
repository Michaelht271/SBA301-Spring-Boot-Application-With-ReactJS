import { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import apis from '../../../services/apis';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import OrchidForm from './OrchidForm';

export default function OrchidManagement() {
    const [orchids, setOrchids] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orchidToDelete, setOrchidToDelete] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingOrchid, setEditingOrchid] = useState(null);
    const [formData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        fetchOrchids();
    }, []);

    const fetchOrchids = async () => {
        try {
            const data = await apis.getAllOrchids();
            setOrchids(data);
        } catch (error) {
            console.error("Failed to fetch orchids", error);
        }
    };

    const handleDeleteClick = (orchid) => {
        setOrchidToDelete(orchid);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (orchidToDelete) {
            try {
                await apis.deleteOrchid(orchidToDelete.id);
                fetchOrchids(); // Refresh the list
            } catch (error) {
                console.error("Failed to delete orchid", error);
            } finally {
                setShowDeleteModal(false);
                setOrchidToDelete(null);
            }
        }
    };

    const handleAddClick = () => {
        setEditingOrchid(null);
        setFormData({});
        setValidationErrors({});
        setShowFormModal(true);
    };

    const handleEditClick = (orchid) => {
        setEditingOrchid(orchid);
        setFormData(orchid);
        setValidationErrors({});
        setShowFormModal(true);
    };

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFormSubmit = async () => {
        // Simple validation
        const errors = {};
        if (!formData.orchidName) errors.orchidName = "Name is required";
        if (!formData.category) errors.category = "Category is required";
        if (!formData.price) errors.price = "Price is required";
        if (!formData.image) errors.image = "Image URL is required";

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            if (editingOrchid) {
                await apis.updateOrchid(editingOrchid.id, formData);
            } else {
                await apis.createOrchid(formData);
            }
            fetchOrchids();
            setShowFormModal(false);
        } catch (error) {
            console.error("Failed to save orchid", error);
        }
    };


    return (
        <div>
            <h2>Orchid Management</h2>
            <Button variant="primary" onClick={handleAddClick} className="mb-3">Add Orchid</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orchids.map((orchid, index) => (
                        <tr key={orchid.id}>
                            <td>{index + 1}</td>
                            <td>{orchid.orchidName}</td>
                            <td>{orchid.category}</td>
                            <td>${orchid.price}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(orchid)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(orchid)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                config={{
                    title: 'Delete Orchid',
                    body: `Are you sure you want to delete "${orchidToDelete?.orchidName}"?`,
                    onConfirm: handleConfirmDelete,
                    confirmLabel: 'Delete',
                    confirmVariant: 'danger',
                }}
            />

            <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingOrchid ? 'Edit Orchid' : 'Add Orchid'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrchidForm
                        orchid={formData}
                        onFieldChange={handleFormChange}
                        validationErrors={validationErrors}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFormModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleFormSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


