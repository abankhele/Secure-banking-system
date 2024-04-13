import { useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useCallback } from 'react';
import accountService from '../../services/accountPost';
import postService from '../../services/accountService';
import UserNavbar from '../../components/Navbar/Navbar';
const AccountDetails = () => {
    const location = useLocation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const { account } = location.state;
    const [accountDetails, setaccountDetails] = useState(account);
    const [isLoading, setIsLoading] = useState(false);
    const [creditAmount, setCreditAmount] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [creditError, setCreditError] = useState(false);
    const [creditSuccessMessage, setCreditSuccessMessage] = useState('');
    const [debitError, setDebitError] = useState(false);
    const [debitSuccessMessage, setDebitSuccessMessage] = useState('');
    const [fetcherror, setFetchError] = useState('');
    const [transferAmount, settransferAmount] = useState('');
    const [recvAccNumber, setrecvAccNumber] = useState('');
    const [transferError, setTransferError] = useState(false);
    const [transferSuccessMessage, settransferSuccessMessage] = useState('');

    const [requestAmount, setRequestAmount] = useState('');
    const [reqAccNumber, setReqAccNumber] = useState('');
    const [requestError, setRequestError] = useState(false);
    const [requestSuccessMessage, setRequestSuccessMessage] = useState('');
    const fetchAccountDetails = useCallback(() => {
        postService.getAllAccountsByUserId()
            .then((response) => {
                const updatedAccount = response.data.find(acc => acc.accountNumber === account.accountNumber);
                if (updatedAccount) {
                    setaccountDetails(updatedAccount);
                    console.log(updatedAccount);
                }
            })
            .catch((error) => {
                console.error('Error fetching accounts:', error);
                setFetchError(error.response?.data?.message || 'An error occurred while fetching accounts.');
            });
    }, [account.accountNumber]);

    useEffect(() => {
        fetchAccountDetails();//mounting(after api i'll remove)
    }, [fetchAccountDetails]);


    const handlecredit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCreditError(null);
        setCreditSuccessMessage('');
        try {

            const response = await accountService.creditAccount(account.accountNumber, creditAmount);
            console.log("Status from server", response);
            setCreditSuccessMessage(response);
            fetchAccountDetails();
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the credit operation.';
            console.error("Error during debit operation:", detailedErrorMessage);
            setCreditError(detailedErrorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    const handledebit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDebitError(null);
        setDebitSuccessMessage('');


        try {

            const response = await accountService.debitAmount(account.accountNumber, debitAmount);
            console.log("Status from server", response);
            setDebitSuccessMessage(response);
            fetchAccountDetails();
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the debit operation.';
            console.error("Error during debit operation:", detailedErrorMessage);
            setDebitError(detailedErrorMessage);

        } finally {
            setIsLoading(false);
        }
    }
    const handletransfer = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTransferError(null);
        settransferSuccessMessage('');


        try {

            const response = await accountService.transferamount(transferAmount, account.accountNumber, recvAccNumber,);//from ravi to configure
            console.log("Status from server", response);
            settransferSuccessMessage(response);
            fetchAccountDetails();
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the debit operation.';
            console.error("Error during transfer money operation:", detailedErrorMessage);
            setTransferError(detailedErrorMessage);

        } finally {
            setIsLoading(false);
        }
    }

    const handlerequest = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTransferError(null);
        settransferSuccessMessage('');


        try {

            const response = await accountService.requestamount(requestAmount, account.accountNumber, reqAccNumber,);//from ravi to configure
            console.log("Status from server", response);
            setRequestSuccessMessage(response);
            fetchAccountDetails();
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the debit operation.';
            console.error("Error during request money operation:", detailedErrorMessage);
            setRequestError(detailedErrorMessage);

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <UserNavbar />
            <div className="container">
                <Card className="mt-4">
                    <Card.Header>Account Details</Card.Header>
                    <Card.Body>
                        <Card.Title>Account Number: {accountDetails.accountNumber}</Card.Title>
                        <Card.Text>

                            Account Type: {accountDetails.accountType}<br />
                            Routing Number: {accountDetails.userId}<br />
                            Balance: {accountDetails.balance}<br />


                            {fetcherror && <div className="alert alert-danger">Error: {fetcherror}</div>}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div className="mt-4">
                    <Tabs
                        defaultActiveKey="credit-funds"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="credit-funds" title="Credit Funds">
                            <div className="mt-4">
                                <Form onSubmit={handlecredit}>
                                    <FloatingLabel

                                        label="Amount to be Credited"
                                        className="mb-3"
                                    >
                                        <Form.Control type="number" placeholder="Amount to be Credited" value={creditAmount} onChange={(e) => setCreditAmount(e.target.value)} required />
                                    </FloatingLabel>
                                    <Button variant="secondary" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </Button>


                                </Form>
                                {creditSuccessMessage && <div className="alert alert-success mt-4">{creditSuccessMessage}</div>}
                                {creditError && <div className="alert alert-danger mt-4">Error: {creditError}</div>}
                            </div>
                        </Tab>
                        <Tab eventKey="debit-funds" title="Debit Funds" >
                            <div className="mt-4">
                                <Form onSubmit={handledebit}>
                                    <FloatingLabel

                                        label="Amount to be Debited"
                                        className="mb-3"
                                    >
                                        <Form.Control type="number" placeholder="Amount to be Debited" value={debitAmount} onChange={(e) => setDebitAmount(e.target.value)} required />
                                    </FloatingLabel>
                                    <Button variant="secondary" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </Button>
                                    {debitSuccessMessage && <div className="alert alert-success mt-4">{debitSuccessMessage}</div>}
                                    {debitError && <div className="alert alert-danger mt-4">Error: {debitError}</div>}


                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="transfer" title="Transfer Funds" >
                            <div className="mt-4">
                                <Form onSubmit={handletransfer}>
                                    <FloatingLabel

                                        label="Account Number of Receiver"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="$" value={recvAccNumber} onChange={(e) => setrecvAccNumber(e.target.value)} required />
                                    </FloatingLabel>

                                    <FloatingLabel

                                        label="Amount"
                                        className="mb-3"
                                    >
                                        <Form.Control type="number" placeholder="$" value={transferAmount} onChange={(e) => settransferAmount(e.target.value)} required />
                                    </FloatingLabel>
                                    <Button variant="secondary" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </Button>
                                    {transferSuccessMessage && <div className="alert alert-success mt-4">{transferSuccessMessage}</div>}
                                    {transferError && <div className="alert alert-danger mt-4">Error: {transferError}</div>}


                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="request" title="Request Funds" >
                            <div className="mt-4">
                                <Form onSubmit={handlerequest}>
                                    <FloatingLabel

                                        label="Request From Account Number"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="$" value={reqAccNumber} onChange={(e) => setReqAccNumber(e.target.value)} required />
                                    </FloatingLabel>

                                    <FloatingLabel

                                        label="Amount"
                                        className="mb-3"
                                    >
                                        <Form.Control type="number" placeholder="$" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)} required />
                                    </FloatingLabel>
                                    <Button variant="secondary" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Requesting...' : 'Request'}
                                    </Button>
                                    {requestSuccessMessage && <div className="alert alert-success mt-4">{requestSuccessMessage}</div>}
                                    {requestError && <div className="alert alert-danger mt-4">Error: {requestError}</div>}


                                </Form>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;