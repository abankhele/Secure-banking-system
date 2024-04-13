import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import authService from '../../services/authService'
const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [show2FA, setShow2FA] = useState(true);

  const [qrurl, setQrUrl] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.signup(firstName, lastName, emailid, password).then(
        (response) => {
          setError("");

          console.log("Sign up successfully", response);
          handleShow();
          //navigate("/login");
          //window.location.reload();
          authService.getQRCode(emailid)
            .then((srcForImage) => {
              console.log("Hi get qr");
              setQrUrl(srcForImage);
              setIsLoading(false);

            })
            .catch((error) => {
              console.error('Qr code error', error);
              setError(error.message);
              setIsLoading(false);
            });
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error.response.data || 'An error occurred');
        }
      );


    } catch (err) {
      console.log("i am the problem", err);
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
    

          {show2FA &&
            <>


              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Two-Factor Authentication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Scan the QR code</Form.Label>

                      {qrurl ? (
                        <img src={qrurl} alt="QR Code" />
                      ) : (
                        <p>Loading QR code...</p>
                      )}

                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" as={Link} to="/login">
                    Login
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          }

        </Form>

        {error && <div className='alert alert-danger mt-4'>{error}</div>}
      </div>
    </div >
  );
}




export default Signup;