import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { createAccount } from '../../services/accountService';
import accountPost from '../../services/accountPost';
import authService from '../../services/authService';

const CreateAccount = () => {
    const [accountType, setAccountType] = useState();
    const [initialdepoist, setInitialDeposit] = useState('');
    const [ssn, setSsn] = useState('');
    const [phnumber, setPhNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setUserId(user.userId);
            console.log(user);
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            // Call the createAccount function from accountService
            const response = await accountPost.createAccount(currentUser.userId, accountType, initialdepoist);
            console.log("Status from server", response);
            setSuccessMessage(response);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred'); // Using err to access the error object
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="mt-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                        <Form.Label>Account Type</Form.Label>
                        <Form.Select
                            value={accountType || ''} // this ensures that accountType is not undefined
                            onChange={(e) => setAccountType(e.target.value)}
                            required
                        >
                            <option value="" disabled>Choose...</option> {/* Default option */}
                            <option value="CHECKING">Checking Account</option>
                            <option value="SAVINGS">Savings Account</option>
                        </Form.Select>
                    </Form.Group>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Initial Deposit"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="Initial Deposit" value={initialdepoist} onChange={(e) => setInitialDeposit(e.target.value)} required />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="SSN"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="SSN" value={ssn} onChange={(e) => setSsn(e.target.value)} required />

                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="Phone Number" value={phnumber} onChange={(e) => setPhNumber(e.target.value)} required />

                    </FloatingLabel>
                    <Button variant="secondary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {error && <div className="alert alert-danger">Error: {error}</div>}
            </div>
        </div>
    );
}

export default CreateAccount;