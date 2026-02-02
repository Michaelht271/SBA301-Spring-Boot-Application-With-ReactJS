import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Container,
    Form,
    Image,
    Modal, Navbar,
    Table, Spinner
} from "react-bootstrap";
import '../../components/orchid/orchid-modal.css';
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import {
    useGetOrchidsQuery,
    useDeleteOrchidMutation,
    useCreateOrchidMutation,
    useGetCategoriesQuery
} from "../../redux/api/orchidApiSlice.js";

export default function Orchids() {
    const [show, setShow] = useState(false);

    const {
        data: orchids,
        isLoading,
        isError,
    } = useGetOrchidsQuery();
    const { data: categories = [] } = useGetCategoriesQuery();
    const [createOrchid, { isLoading: isCreating }] = useCreateOrchidMutation();
    const [deleteOrchid] = useDeleteOrchidMutation();
    
    // Memoize the sorted orchids to prevent re-sorting on every render
    const sortedOrchids = useMemo(() => {
        if (!orchids) return [];
        return [...orchids].sort((a, b) => a.orchidId - b.orchidId);
    }, [orchids]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();

    const watchAll = watch();
    const watchedCategory = watch("categoryId");

    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this orchid?")) return;

        try {
            await deleteOrchid(id).unwrap();
            toast.success("Deleted successfully");
        } catch {
            toast.error("Delete failed");
        }
    };

    /* ================= CREATE ================= */
    const onSubmit = async (data) => {
        const payload = {
            orchidName: data.orchidName,
            orchidURL: data.orchidURL,
            natural: !!data.natural,
            attractive: !!data.attractive,
            orchidCategory: data.categoryId ? { categoryId: parseInt(data.categoryId, 10) } : null,
            orchidDescription: data.orchidDescription || null
        };

        try {
            await createOrchid(payload).unwrap();
            toast.success("Created successfully");
            reset();
            handleClose();
        } catch(err) {
            toast.error(err?.data?.message || "Create failed");
        }
    };

    /* ================= UI ================= */
    if (isLoading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }
    
    if (isError) {
        return (
            <Container className="text-center my-5">
                <h2 className="text-danger">Error fetching orchids.</h2>
                <p>Please try again later.</p>
            </Container>
        )
    }

    return (
        <Container>
            <Toaster />
            <Table striped bordered hover className="my-5">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Orchid name</th>
                    <th>Original</th>
                    <th>Category</th>

                    <th>
                        <Button onClick={handleShow}>
                            <i className="bi bi-node-plus"></i> Add new orchid
                        </Button>
                    </th>
                </tr>
                </thead>

                <tbody>
                {sortedOrchids.length > 0 ? (
                    sortedOrchids.map(o => (
                        <tr key={o.orchidId}>
                            <td>
                                <Image
                                    src={o.orchidURL}
                                    width={40}
                                    height={40}
                                    alt={o.orchidName}
                                    rounded
                                />
                            </td>

                            <td>
                                <Link to={`/orchid/${o.orchidId}`}>
                                    {o.orchidName}
                                </Link>
                            </td>

                            <td>
                                {o.natural ? (
                                    <span className="badge text-bg-success">
                                        Natural
                                    </span>
                                ) : (
                                    <span className="badge text-bg-warning">
                                        Industry
                                    </span>
                                )}
                            </td>

                            <td>{o.orchidCategory?.categoryName || '-'}</td>

                            <td>
                                <Link
                                    to={`/edit/${o.orchidId}`}
                                    className="btn btn-primary me-2"
                                >
                                    <i className="bi bi-pencil-square"></i> Edit
                                </Link>

                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(o.orchidId)}
                                >
                                    <i className="bi bi-trash"></i> Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                            No orchids found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            {/* ============ MODAL ============ */}
            <Modal show={show} onHide={handleClose} backdrop="static" dialogClassName="orchid-modal-dialog" className="orchid-modal">
                <Modal.Header closeButton>
                    <Modal.Title>New Orchid</Modal.Title>
                </Modal.Header>

                <Modal.Body className="orchid-modal-body">
                    <div className="orchid-form-column">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    {...register("orchidURL", {
                                        required: "Image URL is required",
                                        pattern: { value: /^(https?:\/\/).+/, message: "Must be a valid URL" },
                                    })}
                                />
                                {errors.orchidURL && (
                                    <p className="text-danger mt-1">{errors.orchidURL.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    {...register("orchidName", { required: "Name is required" })}
                                />
                                {errors.orchidName && (
                                    <p className="text-danger mt-1">{errors.orchidName.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select {...register("categoryId")}>
                                    <option value="">-- Select a Category --</option>
                                    {categories.map(c => (
                                        <option key={c.categoryId} value={c.categoryId}>
                                            {c.categoryName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    {...register("orchidDescription")}
                                />
                            </Form.Group>

                            <Form.Check
                                type="switch"
                                label="Natural"
                                {...register("natural")}
                                className="mb-2"
                            />

                            <Form.Check
                                type="switch"
                                label="Attractive"
                                {...register("attractive")}
                            />

                            <div style={{marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" disabled={isCreating}>
                                    {isCreating ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="orchid-preview-column">
                        <div className="orchid-preview-card">
                            <img src={watchAll.orchidURL || '/vite.svg'} alt={watchAll.orchidName || 'Preview'} />
                            <div className="orchid-preview-content">
                                <div className="orchid-preview-title">{watchAll.orchidName || 'Orchid name'}</div>
                                <div className="orchid-preview-meta">
                                    <div className="orchid-badge" style={{background:'#198754', color:'#fff'}}>{watchAll.natural ? 'Natural' : 'Industry'}</div>
                                    {watchAll.attractive ? <div className="orchid-badge" style={{background:'#0dcaf0', color:'#062021'}}>Attractive</div> : null}
                                </div>
                                <div className="orchid-description">{watchAll.orchidDescription || 'No description provided yet.'}</div>
                                <div style={{marginTop: '0.75rem', width: '100%', textAlign: 'left'}}>
                                    <small style={{color: 'rgba(255,255,255,0.65)'}}>Category: {categories.find(c => c.categoryId == watchedCategory)?.categoryName || '-'}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
