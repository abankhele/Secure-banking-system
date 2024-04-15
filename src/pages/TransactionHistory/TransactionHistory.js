import UserNavbar from "../../components/Navbar/Navbar";
import postService from "../../services/accountService";
import accountPost from '../../services/accountPost';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Transactionhistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Function to fetch transactions
    const fetchTransactions = () => {
        setIsLoading(true);
        postService.getcustomertransaction()
            .then((response) => {

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
        setError(null);
        setSuccessMessage('');

        try {
            console.log(transactionId, boolValue);
            const response = await accountPost.approvetransaction(transactionId, boolValue);
            console.log("Status from server", response);
            setSuccessMessage(response);
            fetchTransactions();
        } catch (err) {
            console.error('Error updating transaction:', err);
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during transaction approval.';
            setError(detailedErrorMessage);
            fetchTransactions();
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
                    {successMessage && <div className=' alert alert-success mt-4'>{successMessage}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
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
                                                <Card.Title>Transaction ID: {transaction.transactionId}<br /></Card.Title>
                                                <Card.Text>
                                                    {transaction.transactionType !== "DEBIT" && transaction.transactionType !== "CREDIT" && (
                                                        <>To Account: {transaction.toAccountId}<br /></>
                                                    )}
                                                    Amount: ${transaction.amount}<br />
                                                    Transaction Type: {transaction.transactionType}<br />
                                                    Transaction Status: {getStatusMessage(transaction.status)}<br />

                                                    Transaction Time: {transaction.transactionTime}<br />

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
