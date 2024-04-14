import UserNavbar from "../../components/Navbar/Navbar";
import postService from "../../services/accountService";
import accountPost from '../../services/accountPost';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Transactionhistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch transactions
    const fetchTransactions = () => {
        setIsLoading(true);
        postService.getcustomertransaction()
            .then((response) => {
                // Initialize error and success messages for each transaction
                const updatedTransactions = response.data.map(transaction => ({
                    ...transaction,
                    errorMessage: '',
                    successMessage: ''
                }));
                setTransactions(updatedTransactions);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
                setIsLoading(false);
            });
    };

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    const approveTransaction = async (transactionId, boolValue) => {
        setIsLoading(true);
        try {
            const response = await accountPost.approvetransaction(transactionId, boolValue);
            // Assuming response includes a success message
            console.log("Status from server", response);
            fetchTransactions();  // Refetch transactions to update the UI
        } catch (err) {
            console.error('Error updating transaction:', err);
            // Assuming err.response?.data?.message contains the error message
            // Set error at the transaction level if required or show a toast/notification
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusMessage = (status) => {
        switch (status) {
            case 'PENDING_CUSTOMER':
                return 'Pending';
            case 'PENDING_ADMIN':
                return 'Pending from Admin';
            case 'APPROVED':
                return 'Approved';
            case 'DECLINED':
                return 'Declined';
            default:
                return 'Status Unknown'; 
        }
    };

    return (
        <div>
            <UserNavbar />
            <div className="container">
                <div className="mt-4">
                    <div className="mb-4">
                        {isLoading ? (
                            <div>Loading pending transactions...</div>
                        ) : (
                            <>
                                {transactions.map((transaction) => (
                                    <div key={transaction.id} className='mb-4'>
                                        <Card border="dark" style={{ width: '40 rem' }}>
                                            <Card.Header>My Account Number: {transaction.fromAccountId}</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Account Transferred To: {transaction.toAccountId}</Card.Title>
                                                <Card.Text>
                                                    Amount: ${transaction.amount}<br />
                                                    Transaction Type: {transaction.transactionType}<br />
                                                    Transaction Status: {getStatusMessage(transaction.status)}<br />
                                                    Transaction ID: {transaction.transactionId}<br />
                                                    Transaction Time: {transaction.transactionTime}<br /><br />
                                                    {transaction.status == 'PENDING_CUSTOMER' && <>
                                                        <Button variant="success" disabled={isLoading} onClick={() => approveTransaction(transaction.transactionId, true)}>
                                                            Approve Transaction
                                                        </Button>{' '}
                                                        <Button variant="danger" disabled={isLoading} onClick={() => approveTransaction(transaction.transactionId, false)}>
                                                            Cancel Transaction
                                                        </Button></>
                                                    }
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
        </div>
    );
};

export default Transactionhistory;
