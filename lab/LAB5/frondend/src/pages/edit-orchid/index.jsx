import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Container,
    Form,
    Card,
    Row,
    Col,
    Spinner
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import {
    useGetOrchidByIdQuery,
    useUpdateOrchidMutation,
    useGetCategoriesQuery,
} from "../../redux/api/orchidApiSlice";
import Navbar from "../../components/navbar";

export default function EditOrchidPage() {
    const { orchidId } = useParams();
    const navigate = useNavigate();

    const { data: orchid, isLoading: isLoadingOrchid, isError: isOrchidError } = useGetOrchidByIdQuery(orchidId);
    const { data: categories = [], isLoading: isLoadingCategories } = useGetCategoriesQuery();
    const [updateOrchid, { isLoading: isUpdating }] = useUpdateOrchidMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (orchid) {
            reset({
                ...orchid,
                categoryId: orchid.orchidCategory?.categoryId || "",
            });
        }
    }, [orchid, reset]);

    const onSubmit = async (data) => {
        const payload = {
            orchidId: parseInt(orchidId, 10),
            orchidName: data.orchidName,
            orchidURL: data.orchidURL,
            natural: data.natural,
            attractive: data.attractive,
            orchidDescription: data.orchidDescription,
            orchidCategory: data.categoryId
                ? { categoryId: parseInt(data.categoryId, 10) }
                : null,
        };

        try {
            await updateOrchid(payload).unwrap();
            toast.success("Orchid updated successfully!");
            setTimeout(() => navigate("/"), 1500); // Redirect after a short delay
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update orchid.");
            console.error(error);
        }
    };
    
    const isLoading = isLoadingOrchid || isLoadingCategories;

    if (isLoading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" />
            </Container>
        );
    }
    
    if(isOrchidError) {
        return (
             <Container className="text-center my-5">
                <h2 className="text-danger">Orchid not found or failed to load.</h2>
             </Container>
        )
    }

    return (
        <>
            <Container className="my-5">
                <Toaster />
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header as="h4">Edit Orchid</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
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
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control
                                            {...register("orchidURL", {
                                                required: "Image URL is required",
                                                pattern: {
                                                    value: /^(https?:\/\/).+/,
                                                    message: "Must be a valid URL",
                                                },
                                            })}
                                        />
                                        {errors.orchidURL && (
                                            <p className="text-danger mt-1">{errors.orchidURL.message}</p>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select {...register("categoryId")}>
                                            <option value="">-- Select a Category --</option>
                                            {categories.map((c) => (
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
                                        className="mb-3"
                                    />

                                    <div className="d-flex justify-content-end">
                                        <Button
                                            variant="secondary"
                                            onClick={() => navigate("/")}
                                            className="me-2"
                                            disabled={isUpdating}
                                        >
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={isUpdating}>
                                            {isUpdating ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
