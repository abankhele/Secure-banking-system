import { useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import accountService from '../../services/accountPost';
import postService from '../../services/accountService';
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
    const [updateError, setUpdateError] = useState(false);
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
    const [fetcherror, setFetchError] = useState('');

    const fetchAccountDetails = () => {//mounting(after api i'll remove)
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
    };

    useEffect(() => {
        fetchAccountDetails();//mounting(after api i'll remove)
    }, []);


    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUpdateError(null);
        setUpdateSuccessMessage('');
        try {

            const response = await accountService.updateaccount(phoneNumber, account.accountNumber);
            console.log("Status from server", response);
            setUpdateSuccessMessage(response);
            fetchAccountDetails();
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the updating profile.';
            console.error("Error during debit operation:", detailedErrorMessage);
            setUpdateError(detailedErrorMessage);
        } finally {
            setIsLoading(false);
        }
    }
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

    return (
        <div className="container">
            <Card className="mt-4">
                <Card.Header>Account Details</Card.Header>
                <Card.Body>
                    <Card.Title>Account Number: {accountDetails.accountNumber}</Card.Title>
                    <Card.Text>
                        First Name:{accountDetails.firstName}<br />
                        Last Name:{accountDetails.lastName}<br />
                        Account Type: {accountDetails.accountType}<br />
                        Balance: {accountDetails.balance}<br />
                        User ID: {accountDetails.userId}<br />
                        Phone Number:{accountDetails.phoneNumber}<br />
                        {fetcherror && <div className="alert alert-danger">Error: {fetcherror}</div>}
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className="mt-4">
                <Tabs
                    defaultActiveKey="update-profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >

                    <Tab eventKey="update-profile" title="Update Profile">
                        <div className="mt-4">
                            <Form onSubmit={handleUpdate}>
                                <FloatingLabel

                                    label="Phone Number"
                                    className="mb-3"
                                >
                                    <Form.Control type="number" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                </FloatingLabel>
                                <Button variant="secondary" type="submit" disabled={isLoading}>
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </Button>


                            </Form>
                            {updateSuccessMessage && <div className="alert alert-success">{updateSuccessMessage}</div>}
                            {updateError && <div className="alert alert-danger">Error: {updateError}</div>}
                        </div>
                    </Tab>

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
                            {creditSuccessMessage && <div className="alert alert-success">{creditSuccessMessage}</div>}
                            {creditError && <div className="alert alert-danger">Error: {creditError}</div>}
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
                                {debitSuccessMessage && <div className="alert alert-success">{debitSuccessMessage}</div>}
                                {debitError && <div className="alert alert-danger">Error: {debitError}</div>}


                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default AccountDetails;