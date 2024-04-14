import { useLocation, useNavigate } from 'react-router-dom';
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
import authService from '../../services/authService';
import Modal from 'react-bootstrap/Modal';
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

    const [deleteError, setdeleteError] = useState(false);
    const [deletesuccessmsg, setdeletesuccessmsg] = useState('');
    const navigate = useNavigate();

    const [otpsuccess, setotpsuccess] = useState(false);
    const [otperror, setotperror] = useState('');
    const [show2FA, setShow2FA] = useState(false);
    const [twoFACode, setTwoFACode] = useState('');
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [actionAfterOtp, setActionAfterOtp] = useState(null);


    const [currentAction, setCurrentAction] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        setIsLoading(true);
        postService.getuserdetails()
            .then((response) => {
                setEmail(response.data.email);
                setIsLoading(false);

            })
            .catch((error) => {
                console.log("An error occured while fetching email");

            });
    }, []);


    const validateOTP = async (email, otp) => {
        try {
            const response = await authService.validateotp(email, otp);
            return response.valid;
        } catch (error) {
            console.error('Error during OTP validation:', error);
            return false;
        }
    };

    const initiateDeleteAccount = (accNumber1) => {
        setActionAfterOtp(() => () => handleDeleteAccount(accNumber1));
        setShow(true);
    };

    const handleDeleteAccount = async (accNumber) => {
        try {
            const deleteResponse = await accountService.deleteacc(accNumber);
            console.log("Account deleted successfully:", deleteResponse);
            setdeletesuccessmsg("Account successfully deleted.");
            navigate('/account-info');
        } catch (error) {
            console.error("Failed to delete account:", error);
            setdeleteError("Failed to delete account.");
        }
    };


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
        fetchAccountDetails();
    }, [fetchAccountDetails]);
    //CREDIT
    const handlecredit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCreditError(null);

        if (parseFloat(creditAmount) > 1000) {

            setActionAfterOtp(() => async () => {
                await processCreditTransaction(accountDetails.accountNumber, creditAmount);
            });
            setShow(true);
        } else {

            await processCreditTransaction(accountDetails.accountNumber, creditAmount);
        }
    };

    const handleOtpSubmission = async (e) => {
        e.preventDefault();
        const isValid = await validateOTP(email, twoFACode);
        if (isValid) {
            actionAfterOtp();
            setotpsuccess(true);
            setShow(false);
            setotperror('');
        } else {
            setotperror("Invalid OTP. Please try again.");
            setotpsuccess(false);
        }
    };

    const processCreditTransaction = async (accountNumber, amount) => {
        setIsLoading(true);
        try {
            const response = await accountService.creditAccount(accountNumber, amount);
            console.log("Credit transaction successful:", response);
            setCreditSuccessMessage(response);
            fetchAccountDetails();
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the credit operation.';
            console.error("Credit operation error:", detailedErrorMessage);
            setCreditError(detailedErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };



    //DEBIT
    const handledebit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDebitError(null);
        setDebitSuccessMessage('');

        if (parseFloat(debitAmount) > 1000) {
            setActionAfterOtp(() => async () => {
                await processDebitTransaction(accountDetails.accountNumber, debitAmount);
            });
            setShow(true);
        } else {
            await processDebitTransaction(accountDetails.accountNumber, debitAmount);
        }
    };

    const processDebitTransaction = async (accountNumber, amount) => {
        try {
            const response = await accountService.debitAmount(accountNumber, amount);
            console.log("Debit transaction successful:", response);
            setDebitSuccessMessage(response);
            fetchAccountDetails();
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the debit operation.';
            console.error("Debit operation error:", detailedErrorMessage);
            setDebitError(detailedErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    const handletransfer = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTransferError(null);
        settransferSuccessMessage('');
    
        if (parseFloat(transferAmount) > 1000) {
            setActionAfterOtp(() => async () => {
                await processTransferTransaction(accountDetails.accountNumber, transferAmount, recvAccNumber);
            });
            setShow(true); 
        } else {
            await processTransferTransaction(accountDetails.accountNumber, transferAmount, recvAccNumber);
        }
    };
    
    const processTransferTransaction = async (accountNumber, amount, receiverAccountNumber) => {
        try {
            const response = await accountService.transferamount(amount, accountNumber, receiverAccountNumber);
            console.log("Transfer transaction successful:", response);
            settransferSuccessMessage(response);
            fetchAccountDetails(); 
        } catch (err) {
            const detailedErrorMessage = err.response ? JSON.stringify(err.response.data, null, 2) : 'An error occurred during the transfer operation.';
            console.error("Transfer operation error:", detailedErrorMessage);
            setTransferError(detailedErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handlerequest = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTransferError(null);
        settransferSuccessMessage('');


        try {

            const response = await accountService.requestamount(requestAmount, reqAccNumber, account.accountNumber);//from ravi to configure
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
                            <Button variant="danger mt-4" type="submit" onClick={() => initiateDeleteAccount(accountDetails.accountNumber)}>
                                Delete Account
                            </Button>

                            {
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Verify OTP</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleOtpSubmission}>
                                            <Form.Group className="mb-3" controlId="formGroupOTP">
                                                <Form.Label>Enter OTP</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="XXXXXX"
                                                    value={twoFACode}
                                                    onChange={(e) => setTwoFACode(e.target.value)}
                                                    required />
                                            </Form.Group>
                                            <Button variant="secondary" type="submit">
                                                Verify and Proceed
                                            </Button>
                                        </Form>
                                        {otperror && <div className="alert alert-danger mt-4">{otperror}</div>}
                                    </Modal.Body>
                                </Modal>
                            }

                            {fetcherror && <div className="alert alert-danger">Error: {fetcherror}</div>}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div className="mt-4">
                    {accountDetails.accountType !== "MERCHANT" && (
                        <>
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
                        </>)}
                    <div className="mt-4">
                        {accountDetails.accountType === "MERCHANT" && (
                            <>
                                <Tabs
                                    defaultActiveKey="request"
                                    id="uncontrolled-tab-example1"
                                    className="mb-3">

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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;