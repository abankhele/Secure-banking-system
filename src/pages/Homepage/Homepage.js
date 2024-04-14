import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "./Home.css";
const Homepage = () => {
    return (
        <div className='home-page'>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Secure Banking System</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">

                        <Navbar.Text >
                            <Nav className="me-auto">
                                <Nav.Link href="/signup">Signup</Nav.Link>
                                <Nav.Link href="/login">SignIn</Nav.Link>
                            </Nav>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="home-content">
                <div className="home-introduction">
                    <h2>Simplify Your World: All-in-One, All for You.</h2>
                    <p>Connecting Banking World.</p>
                </div>
            </div>
            <div className="home-footer">
                <p>© 2024 Secure Banking System. All Rights Reserved.</p>
            </div>
        </div>

    );
}

export default Homepage;
