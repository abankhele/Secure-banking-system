import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../../services/authService';
import postService from '../../services/accountService';
const Login = () => {
    const [emailid, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [show2FA, setShow2FA] = useState(false);
    const [twoFACode, setTwoFACode] = useState('');
    const navigate = useNavigate();
    const [qrurl, setQrUrl] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(emailid, password).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div className="login">
            <div className="container">
                <div className="mt-4">
                    <Form onSubmit={handleLogin}>
                        <FloatingLabel

                            label="Email Address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="Email Address" value={emailid} onChange={(e) => setEmailId(e.target.value)} required />
                        </FloatingLabel>
                        <FloatingLabel

                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </FloatingLabel>
                        <Button variant="secondary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                        {qrurl && <img src={qrurl} alt="QR Code" />}

                    </Form>
                    {error && <div className="text-danger mt-3">{error}</div>}


                </div>
            </div>
        </div>
    );
}

export default Login;