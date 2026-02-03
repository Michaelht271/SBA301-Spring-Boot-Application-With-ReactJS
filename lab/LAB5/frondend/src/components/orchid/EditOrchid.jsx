import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Container, Form, FormGroup, Row,} from "react-bootstrap";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";

export default function EditOrchid() {
    const {id} = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
    const API_ENDPOINTS = {
        getOrchid: (id) => `${baseUrl}/api/orchids/${id}`,
        updateOrchid: (id) => `${baseUrl}/api/orchids/${id}`
    };

    const [api, setApi] = useState({});
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.getOrchid(id));
            setApi(res.data);
            reset(res.data);
        } catch (error) {
            toast.error("Error fetching data");
        } finally {
            setLoading(false);
        }
    }, [id, reset, API_ENDPOINTS]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onSubmit = async (data) => {
        try {
            await axios.put(API_ENDPOINTS.updateOrchid(id), data);
            toast.success("Update success");
        } catch (error) {
            toast.error("Error updating data");
        }
    };

    if (loading) {
        return <Container className="text-center my-5"><h2>Loading...</h2></Container>;
    }

    return (
        <Container>
            <Toaster/>
            <Row>
                <p className="lead text-primary">
                    Edit the orchid: {api.orchidName}
                </p>
                <hr/>
                <Col md={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                {...register("orchidName", {required: true})}
                                type="text"
                            />
                            {errors.orchidName && (
                                <p className="text-danger">Name is required</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                {...register("orchidURL", {
                                    required: true,
                                    pattern: /(https?:\/\/[^\s]+)/i,
                                })}
                                type="text"
                            />
                            {errors.orchidURL && errors.orchidURL.type === "pattern" && (
                                <p className="text-danger">Image must be valid URL</p>
                            )}
                        </Form.Group>

                        <FormGroup>
                            <Form.Check
                                type="switch"
                                label="Natural"
                                {...register("isNatural")}
                            />
                        </FormGroup>

                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                        <Link to="/" className="btn btn-secondary ms-2">
                            Back
                        </Link>
                    </form>
                </Col>
                <Col md={4}>
                    <img src={api.orchidURL} alt={api.orchidName} className="img-fluid"/>
                </Col>
            </Row>
        </Container>
    );
}
