import {Container} from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes

function Footer(
    {author}
) {
    const {name, email, avatar} = author;
    return (
        <footer className=" py-4 mt-auto">
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

// Add PropTypes for type checking
Footer.propTypes = {
    author: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
};

export default Footer;