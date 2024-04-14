import Card from 'react-bootstrap/Card';

import { useState, useEffect } from 'react';
import accountService from '../../services/accountPost';
import postService from '../../services/accountService';
import UserNavbar from '../../components/Navbar/Navbar';
const ViewAllAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        postService.listAllAccountsAdmin()
            .then((response) => {
                setAccounts(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching accounts:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <UserNavbar />
            <div className="container">
                <div className="mt-4">
                    <div className="mb-4">
                        {isLoading ? (
                            <div>Loading accounts...</div>
                        ) : (
                            <>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                                {accounts.map((account) => (
                                    <div key={account.id} className='mb-4'>
                                        <Card border="dark" style={{ width: '40 rem' }}>
                                            <Card.Header>Account Type: {account.accountType}</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Account Number: {account.accountNumber}</Card.Title>
                                                <Card.Text>
                                                    Account Type: {account.accountType}<br />
                                                    Balance: {account.balance}<br />
                                                    User ID: {account.userId}<br />



                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


export default ViewAllAccounts;