import {React, useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, loginGoogle, loginFacebook } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    async function handleLogin(e) {
        e.preventDefault()
        try{
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch{
            setLoading(false);
            setError("Failed to log in")
        } 
    }

    async function handleGoogleLogin(e) {
        e.preventDefault()
        try{
            setError("");
            setLoading(true);
            await loginGoogle()
            navigate('/')
        } catch{
            setLoading(false);
            setError("Failed to log in")
        } 
    }

    async function handleFacebookLogin(e) {
        e.preventDefault()
        try{
            setError("");
            setLoading(true);
            await loginFacebook()
            navigate('/')
        } catch{
            setLoading(false);
            setError("Failed to log in")
        } 
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ handleLogin}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-2' type='submit'>Log In</Button>
                    </Form>
                    <Button onClick={handleGoogleLogin}>Google</Button>
                    <Button onClick={handleFacebookLogin}>Facebook</Button>
                    <div className="text-center w-100 mt-3">
                        <Link to={'/forgot-password'}>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login;
