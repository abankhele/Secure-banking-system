import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/Navbar/Navbar';
import postService from '../../services/accountService';
import { useState, useEffect } from 'react';
const Dashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [adminCheck, setAdminCheck] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        postService.listAllAccountsAdmin()
            .then((response) => {
                console.log("you are the king");
            })
            .catch((error) => {
                console.error('Error fetching accounts:', error);
                setAdminCheck(false);
            });
    }, []);
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
                                <Card.Header>My Transaction History</Card.Header>
                                <Card.Body>
                                    <Card.Title>All Accounts</Card.Title>
                                    <Link to="/transactionhistory"><Button variant="primary">View Status</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                        {adminCheck==true && (<>
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
                        </>)}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
