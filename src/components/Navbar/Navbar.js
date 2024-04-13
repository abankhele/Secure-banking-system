import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const UserNavbar = () => {
    return (



        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Secure Banking System</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                    <Navbar.Text >
                        <Nav className="me-auto">
                            <Nav.Link href="/userprofile">User Profile</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>



    )
}
export default UserNavbar;