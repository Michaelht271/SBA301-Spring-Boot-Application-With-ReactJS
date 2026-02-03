import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Button, Container, Form, Image, Modal, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

export default function Orchids() {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
    // Define API endpoints
    const API_ENDPOINTS = {
        getOrchids: `${baseUrl}/api/orchids`,
        deleteOrchid: (orchidId) => `${baseUrl}/api/orchids/${orchidId}`,
        createOrchid: `${baseUrl}/api/orchids`
    };
    const [api, setAPI] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const fetchData = async () => {
        try {
            const url = API_ENDPOINTS.getOrchids;
            const response = await axios.get(url);
            const data = response.data;
            data.sort((a, b) => parseInt(a.orchidId) - parseInt(b.orchidId));
            setAPI(data);
        } catch (error) {
            toast.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (orchidId) => {
        try {
            const url = API_ENDPOINTS.deleteOrchid(orchidId);
            await axios.delete(url);
            setAPI(api.filter(o => o.orchidId !== orchidId));
            toast.success("Data deleted successfully");
        } catch (error) {
            toast.error("Error deleting data", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const url = API_ENDPOINTS.createOrchid;
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setAPI([...api, response.data]);
            setShow(false);
            reset();
            toast.success("Data created successfully");
        } catch (error) {
            toast.error("Error creating data", error);
        }
    };

    if (loading) {
        return <Container className="text-center my-5"><h2>Loading...</h2></Container>;
    }

    return (
        <Container>
            <Toaster/>
            <Table striped bordered hover className="my-5">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Orchid name</th>
                    <th>Original</th>
                    <th>
                        <button
                            onClick={handleShow}
                            type="button"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-node-plus"></i> Add new orchid
                        </button>
                    </th>
                </tr>
                </thead>

                <tbody>
                {api.length > 0 ? (
                    api.map((o) => (
                        <tr key={o.orchidId}>
                            <td>
                                <Image src={o.orchidURL} width={40} rounded/>
                            </td>

                            <td>
                                <Link to={`/orchid/${o.orchidId}`}>{o.orchidName}</Link>
                            </td>

                            <td>
                                {o.isNatural ? (
                                    <span className="badge text-bg-success">Natural</span>
                                ) : (
                                    <span className="badge text-bg-warning">Industry</span>
                                )}
                            </td>

                            <td>
                                <Link to={`/edit/${o.orchidId}`} className="btn btn-primary me-2">
                                    <i className="bi bi-pencil-square"></i> Edit
                                </Link>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this orchid?")) {
                                            handleDelete(o.orchidId);
                                        }
                                    }}
                                >
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No orchids found.</td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>New Orchid</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                {...register("orchidName", {required: true})}
                            />
                            {errors.orchidName &&
                                errors.orchidName.type === "required" && (
                                    <p className="text-danger">Name is required</p>
                                )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("image", {
                                    required: true,
                                    pattern:
                                        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/?.*$/,
                                })}
                            />
                            {errors.image && errors.image.type === "pattern" && (
                                <p className="text-danger">Image must be a valid URL</p>
                            )}
                        </Form.Group>

                        <Form.Group>
                            <Form.Check
                                type="switch"
                                orchidId="custom-switch"
                                label="Natural"
                                {...register("isNatural")}
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

        </Container>
    );

}