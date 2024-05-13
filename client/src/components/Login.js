import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Form, Button, Row, Col,Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(null); 
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginMessage('');
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                // If login is successful
                login();
                navigate('/');
                setLoginMessage('Login successful.');
                setIsLoginSuccessful(true);
            } else {
                setLoginMessage(`Login failed: ${data.error || 'Unknown error'}`);
                setIsLoginSuccessful(false);
            }
        } catch (error) {
            // Handle errors in login process
            console.error('Login Error:', error);
            setLoginMessage('An error occurred during login.');
            setIsLoginSuccessful(false);
        }
    };
           
    const navigateToSignup = () => {
        navigate('/signup');
    };
       
        
    return (
        <div className='login-container' id="login">
            <Container>
                <Row>
                    <h1>Login</h1>
                    <Form onSubmit={handleLogin} >
            
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                
                        <Form.Group className="mb-3" controlId="formBasicPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
            
                        <Button variant="primary" type="submit" className="Loginpage-button">
                            Submit
                        </Button>
                        <Row className="mt-3">
                            <Col>
                                <p className="text-muted">
                                    Don't have an account?
                                    <Button variant="link" onClick={navigateToSignup} className="Loginpage-signup-button">Sign Up</Button>
                                </p>
                            </Col>
                        </Row>
                    </Form>
                    {loginMessage && (
                        <Alert variant={isLoginSuccessful ? 'success' : 'danger'}>
                            {loginMessage}
                        </Alert>
                    )}
                </Row>
            </Container>
        </div>
    )
};
