import { Container, Row, Col, Image } from 'react-bootstrap'
import avatar from '../../../assets/img/avatar.jpeg'

function About() {
    return (
        <Container className="py-5">
            <Row className="align-items-center">

                {/* Avatar */}
                <Col md={4} className="text-center mb-4 mb-md-0">
                    <Image
                        src={avatar}
                        roundedCircle
                        width={180}
                        height={180}
                        alt="MichaelDev"
                    />
                </Col>

                {/* Content */}
                <Col md={8}>
                    <h2 className="mb-3">About Me</h2>

                    <p>
                        Hello 👋, I’m <strong>MichaelDev</strong>, a software developer who is
                        passionate about building clean, scalable, and user-friendly web applications.
                    </p>

                    <p>
                        My main stack includes <strong>Java, Spring Boot, React, and SQL</strong>.
                        I enjoy learning new technologies and improving my coding skills every day.
                    </p>

                    <p>
                        This website is a small portfolio where I share my projects,
                        experience, and learning journey.
                    </p>
                </Col>

            </Row>
        </Container>
    )
}

export default About
