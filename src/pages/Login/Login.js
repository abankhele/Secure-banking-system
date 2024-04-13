import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../../services/authService';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Login = () => {
    const [emailid, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [show2FA, setShow2FA] = useState(false);
    const [twoFACode, setTwoFACode] = useState('');
    const navigate = useNavigate();
    const [qrurl, setQrUrl] = useState('');
    const [show, setShow] = useState(false);
    const [respbool, setRespBool] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            handleShow();

            await authService.login(emailid, password).then(
                () => {
                    console.log("In");
                    setShow2FA(true);
                    handleShow();
                    // navigate("/doubleauthentication");
                    // window.location.reload();
                },
                (error) => {
                    setShow2FA(false);
                    console.log(error);
                }
            );

        } catch (err) {
            setShow2FA(false);
            console.log(err);
        }
    };

    const handleOtp = async (e) => {

        e.preventDefault();
        try {

            authService.validateotp(emailid, twoFACode)
                .then((response) => {
                    setRespBool(response.valid);

                    console.log("got otp", response);
                    if (response.valid == true) {
                        navigate("/");
                    }
                    else if (response.valid == false) {
                        setError("Invalid OTP.Please try again");

                    }



                })
                .catch((error) => {
                    console.error('otp', error);
                    setError(error.message);

                });



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


                    </Form>

                    {show2FA &&
                        <>


                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Google Authenticator</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleOtp}>
                                        <Form.Group className="mb-3" controlId="formGroupOTP">
                                            <Form.Label>Enter OTP</Form.Label>
                                            <Form.Control type="number" placeholder="XXXXXX" value={twoFACode} onChange={(e) => setTwoFACode(e.target.value)} required />
                                        </Form.Group>
                                        <Button variant="secondary" type="submit">
                                            Verify OTP
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </>
                    }
                    {error && <div className="text-danger mt-3">{error}</div>}
                </div>
            </div >
        </div >
    );
}

export default Login;