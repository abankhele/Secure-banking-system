import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { createAccount } from '../../services/accountService';
import accountPost from '../../services/accountPost';
import authService from '../../services/authService';
import UserNavbar from '../../components/Navbar/Navbar';

const CreateAccount = () => {
    const [accountType, setAccountType] = useState();
    const [initialdepoist, setInitialDeposit] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');






    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        try {

            const response = await accountPost.createAccount(accountType, initialdepoist);
            console.log("Status from server", response);
            setSuccessMessage(response);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="content">
            <UserNavbar/>
            <div className="container">

                <div className="mt-4">

                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                            <Form.Label>Account Type</Form.Label>
                            <Form.Select
                                value={accountType || ''}
                                onChange={(e) => setAccountType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Choose...</option>
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

                        <Button variant="secondary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                    {successMessage && <div className="alert alert-success mt-4">{successMessage}</div>}

                    {error && <div className="alert alert-danger mt-4">Error: {error}</div>}
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;