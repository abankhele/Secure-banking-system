import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
const UserNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.loggingoff()
            .then(response => {

                console.log("Logged out successfully");

                authService.logout();
                navigate('/');
            })
            .catch(error => {
                console.error("Logout failed", error);

            });
    };

    return (<>

        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">Secure Banking System</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="justify-content-end">
                    <Navbar.Text>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/userprofile">User Profile</Nav.Link>
                            <Nav.Link onClick={handleLogout} to="/">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}
export default UserNavbar;