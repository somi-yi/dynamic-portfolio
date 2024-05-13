
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(''); // To hold password strength errors
    const [role, setRole] = useState('');
    const roles = ['Previous Employer', 'Recruiter/HR', 'Visitor'];
    const navigate = useNavigate();

    // Function to check password strength
    const checkPasswordStrength = (password) => {
        // Implement similar logic to your backend's is_strong_password function here
        let message = '';
        if (password.length < 8) {
            message = 'Password must be at least 8 characters long.';
        } else if (!/[a-z]/.test(password)) {
            message = 'Password must include lowercase letters.';
        } else if (!/[A-Z]/.test(password)) {
            message = 'Password must include uppercase letters.';
        } else if (!/[0-9]/.test(password)) {
            message = 'Password must include digits.';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            message = 'Password must include special characters.';
        }

        setPasswordError(message); // Set the password error message
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (passwordError) {
            alert("Please fix the password errors before submitting.");
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }), 
            });


            const data = await response.json();
            if (response.ok) {
                console.log('Signup Successful', data);
   
                navigate(`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
            } else {
                console.log('Signup Failed:', data.error);
            }
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };

    return (
        <div className='signup-container'id="signup">
            <Container >
                <h1>Sign Up</h1>
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select a role</option>
                            {roles.map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordStrength(e.target.value);
                            }}
                        />
                        {passwordError && <Alert variant="danger">{passwordError}</Alert>} {/* Show password error */}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="signup-button">
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </div>
    );
};
