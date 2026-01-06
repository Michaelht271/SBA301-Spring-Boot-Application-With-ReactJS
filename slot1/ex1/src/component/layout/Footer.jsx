import {Container, Row, Col} from 'react-bootstrap'
import avatar from '../../assets/img/avatar.jpeg'
function Footer() {
    return (
        <footer className="  fixed-bottom  py-4 mt-auto">
            <Container className={"d-flex justify-content-center align-items-center gap-3"}>
                <img
                    src ={avatar}
                    alt={"MichaelDev"}
                    className={"rounded-circle"}
                    width={"40"}
                    height={"40"}
                />
                {/* Link */}
            <div>
                <h2>Author: &copy; MichaelDev </h2>
                <p> All right reserved</p>
            </div>

                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-decoration-none fw-semibold"
                >
                    annvde180051@fpt.edu.vn
                </a>
            </Container>
        </footer>

    )
}

export default Footer;