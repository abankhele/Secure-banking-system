import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import postService from '../../services/accountService';
import { useState, useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import accountPost from '../../services/accountPost';


const TransactionApproval = () => {
    const [approvals, setApprovals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const fetchPendingTransactions = useCallback(() => {
        setIsLoading(true);
        postService.getpendingtransactions()
            .then((response) => {
                console.log("hi");
                setApprovals(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pending transactions:', error);
                setError(error.response?.data?.message || 'An error occurred while fetching pending transactions.');
                setIsLoading(false);
            }
            );

            

    },[approvals.accountId])
    useEffect(() => {
        fetchPendingTransactions();
    }, [fetchPendingTransactions]);

    const approveTransaction = async (transactionId, boolValue) => {
        console.log(transactionId);
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        try {

            const response = await accountPost.approvetransaction(transactionId, boolValue);
            console.log("Status from server", response);
            setSuccessMessage(response);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <div className="container">
            <div className="mt-4">
                <div className="mb-4">
                    {isLoading ? (
                        <div>Loading pending approvals</div>
                    ) : (
                        <>

                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {approvals.map((approval) => (
                                <div key={approval.id} className='mb-4'>
                                    <Card border="dark" style={{ width: '40 rem' }}>
                                        <Card.Header>Account UserID: {approval.userId}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>Account Number: {approval.accountId}</Card.Title>
                                            <Card.Text>
                                                Amount: {approval.amount}<br />
                                                Transaction Type: {approval.transactionType}<br />
                                                Transaction ID: {approval.transactionId}<br />
                                                Transaction Time: {approval.transactionTime}<br /><br />
                                                <Button variant="success" disabled={isLoading} onClick={() => approveTransaction(approval.transactionId, true)}>
                                                    {isLoading ? 'Approving Transaction...' : 'Approve Transaction'}
                                                </Button>   {'  '}
                                                <Button variant="danger" disabled={isLoading} onClick={() => approveTransaction(approval.transactionId, false)}>
                                                    {isLoading ? 'Cancelling Transaction...' : 'Cancel Transaction'}
                                                </Button>



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
    );
}

export default TransactionApproval;