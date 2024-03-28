import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


import  authService  from '../../services/authService'
const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailid, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          await authService.signup(firstName,lastName,emailid, password).then(
            (response) => {
 
              console.log("Sign up successfully", response);
              navigate("/login");
              window.location.reload();
              setIsLoading(false);
            },
            (error) => {
              console.log(error);
            }
          );
        } catch (err) {
          console.log(err);
          setError(error.response?.data?.message || 'An error occurred');
          setIsLoading(false);
        }
      };
    return (
        <div className="container">
            <div className="mt-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupLasttName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={emailid} onChange={(e) => setEmailId(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="secondary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form>
                {error && <div className='error'>{error}</div>}
            </div>
        </div>
    );
}




export default Signup;