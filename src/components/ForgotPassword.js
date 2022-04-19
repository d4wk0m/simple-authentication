import {React, useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleReset(e) {
        e.preventDefault()

        try{
            setMessage('');
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for instructions')
        } catch{
            setLoading(false);
            setError("Failed to reset password")
        }

        
    }

    return (
        <>
            {message && <Alert variant="success">{message}</Alert>}
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ handleReset}>
                        <Form.Group id="email" className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-2' type='submit'>Reset Password</Button>
                    </Form>
                    <div className="text-center w-100 mt-3">
                        <Link to={'/login'}>Log in</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword;
