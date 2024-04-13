import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/Navbar/Navbar';
const Dashboard = () => {
    return (
        
        <div className="Dashboard">
           <UserNavbar />
            <div className="container">
                <div className="mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <Card className="mb-4">
                                <Card.Header>My Accounts</Card.Header>
                                <Card.Body>
                                    <Card.Title>My Bank Accounts</Card.Title>
                                    <Link to="/account-info"><Button variant="primary">Check Accounts</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className="mb-4">
                                <Card.Header>Admin</Card.Header>
                                <Card.Body>
                                    <Card.Title>View All Bank Accounts</Card.Title>
                                    <Link to="/all-accounts"><Button variant="primary">Check Accounts</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className="mb-4">
                                <Card.Header>Admin</Card.Header>
                                <Card.Body>
                                    <Card.Title>View Pending Transaction Approvals</Card.Title>
                                    <Link to="/pendingapproval"><Button variant="primary">View Approvals</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className="mb-4">
                                <Card.Header>Admin</Card.Header>
                                <Card.Body>
                                    <Card.Title>User Profile</Card.Title>
                                    <Link to="/pendingapproval"><Button variant="primary">View Approvals</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
