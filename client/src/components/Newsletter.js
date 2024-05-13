import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && email.indexOf("@") > -1) {
            setStatus('sending');
            try {
                const response = await fetch("/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ EMAIL: email }),
                });
                const result = await response.json();
                setStatus(result.status);
                setMessage(result.message);
            } catch (error) {
                console.error('Request failed', error);
                setStatus('error');
                setMessage('Failed to subscribe. Please try again later.');
            }
        }
    }

    useEffect(() => {
        if (status === 'success') setEmail('');
    }, [status])

    return (
        <Col lg={12}>
            <div className="newsletter-bx wow slideInUp" id="newsletter">
                <Row>
                    <Col lg={12} md={6} xl={5}>
                        <h3>Subscribe to my Newsletter<br></br> & Never miss latest updates</h3>
                        {status === 'sending' && <Alert>Sending...</Alert>}
                        {status === 'error' && <Alert variant="danger">{message}</Alert>}
                        {status === 'success' && <Alert variant="success">{message}</Alert>}
                    </Col>
                    <Col md={6} xl={7}>
                        <form onSubmit={handleSubmit}>
                            <div className="new-email-bx">
                                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}