import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect, useCallback } from 'react';
import UserNavbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import postService from '../../services/accountService';
import accountService from '../../services/accountPost';

const TransactionApproval = () => {
    const [approvals, setApprovals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const fetchPendingTransactions = useCallback(() => {
        setIsLoading(true);
        postService.getpendingtransactions()
            .then(response => {
                setApprovals(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pending transactions:', error);
                setError(error.response?.data?.message || 'An error occurred while fetching pending transactions.');
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchPendingTransactions();
    }, [fetchPendingTransactions]);

    const approveTransaction = async (transactionId, boolValue) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');
    
        try {
            console.log(transactionId, boolValue);
            const response = await accountService.approvetransaction(transactionId, boolValue);
            console.log("Status from server", response);
            setSuccessMessage('Transaction processed successfully.');
            fetchPendingTransactions();  
        } catch (err) {
            console.error("Error during transaction approval:", err.message);
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during transaction approval.';
            setError(detailedErrorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    

    return (
        <>
            <UserNavbar />
            <div className="container">
                <h2 className='mt-4 mb-4'>Pending Transactions</h2>
                {successMessage && <div className=' alert alert-success mt-4'>{successMessage}</div>}
                {isLoading ? (
                    <div>Loading pending approvals...</div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : (
                    approvals.map((approval) => (
                        <Card key={approval.transactionId} className="mb-4">
                            <Card.Header>Transaction ID: {approval.transactionId}</Card.Header>
                            <Card.Body>
                                <Card.Title>From Account: {approval.fromAccountId}</Card.Title>
                                <Card.Text>
                                    Amount: ${approval.amount.toFixed(2)}<br />
                                    Type: {approval.transactionType}<br />
                                    Status: {approval.status}<br />
                                    Transaction Time: {new Date(approval.transactionTime).toLocaleString()}<br />
                                    {approval.transactionType !== "DEBIT" && approval.transactionType !== "CREDIT" && (
                                        <>To Account: {approval.toAccountId}<br /></>
                                    )}
                                    <Button variant="success" disabled={isLoading} onClick={() => approveTransaction(approval.transactionId, true)}>
                                        Approve
                                    </Button>
                                    {' '}
                                    <Button variant="danger" disabled={isLoading} onClick={() => approveTransaction(approval.transactionId, false)}>
                                        Cancel
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </>
    );
}

export default TransactionApproval;
