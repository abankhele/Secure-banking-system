import React, { useState, useEffect } from 'react';
import UserNavbar from "../../components/Navbar/Navbar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import accountService from '../../services/accountPost';
import postService from '../../services/accountService';

function splitCamelCase(text) {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const navigate = useNavigate();

    const fetchUserDetails = (callback) => {
        setIsLoading(true);
        postService.getuserdetails()
            .then((response) => {
                setUserDetails({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phoneNumber: response.data.phoneNumber
                });
                setEmail(response.data.email);

                setIsLoading(false);
                if (callback) callback();
            })
            .catch((error) => {
                setError('An error occurred while fetching accounts.');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (!editMode) {
            fetchUserDetails(() => {
                setFormKey(prevKey => prevKey + 1);
            });
        }
    }, [editMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const toggleEdit = () => {
        if (editMode) {
            fetchUserDetails(() => {
                setFormKey(prevKey => prevKey + 1);
            });
        }
        setEditMode(!editMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await accountService.updateaccount(userDetails).then(
                (response) => {
                    setError("");
                    console.log("Profile updated successfully", response);
                    setIsLoading(false);
                    setEditMode(false);
                },
                (error) => {
                    setError('An error occurred');
                    setIsLoading(false);
                }
            );
        } catch (err) {
            setError('An error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <UserNavbar />
            <div className="container">
                <div className="mt-4">
                    <Form key={formKey} onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                disabled={!editMode}
                            />
                        </Form.Group>
                        {Object.entries(userDetails).map(([key, value]) => (
                            <Form.Group className="mb-3" controlId={`formGroup${key}`} key={key}>

                                <Form.Label>{key.charAt(0).toUpperCase() + splitCamelCase(key.slice(1))}</Form.Label>
                                <Form.Control
                                    type={key === 'phoneNumber' ? 'number' : 'text'}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    required
                                    disabled={!editMode}
                                />
                            </Form.Group>
                        ))}
                        <Button variant="secondary" className="me-4" onClick={toggleEdit}>
                            {editMode ? 'Cancel' : 'Edit'}
                        </Button>
                        {editMode && (
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update'}
                            </Button>
                        )}
                    </Form>
                    {error && <div className='alert alert-danger mt-4'>{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
