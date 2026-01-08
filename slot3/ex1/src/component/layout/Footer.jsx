import {Container, Row, Col} from 'react-bootstrap'

function Footer(
    {author}
) {
    const {name, email, avatar} = author;
    return (
        <footer className="  fixed-bottom  py-4 mt-auto">
            <Container className={"d-flex justify-content-center align-items-center gap-3"}>
                <img
                    src ={avatar}
                    alt={"MichaelDev"}
                    className={"rounded-circle"}
                    width={"80"}
                    height={"80"}
                />
                {/* Link */}
            <div>
                <h2>Author: &copy; {name} </h2>
                <p> All right reserved</p>
            </div>

                <a
                    href={`mailto:${email}`}
                    className="text-decoration-none fw-semibold"
                >
                    {email}
                </a>
            </Container>
        </footer>

    )
}

export default Footer;