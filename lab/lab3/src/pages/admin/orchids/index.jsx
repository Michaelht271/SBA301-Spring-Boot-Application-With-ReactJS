import React from 'react';
import { Container } from 'react-bootstrap';
import OrchidManagement from '../../../features/orchids/components/OrchidManagement';

export default function OrchidManagementPage() {
    return (
        <Container className="py-5">
            <OrchidManagement />
        </Container>
    );
}

