import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, Button, Alert } from 'react-bootstrap'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');

    

    async function handleLogout() {
        cookies.remove('email');
        cookies.remove('password');
        setError('');
        try{
            await(
                logout()
            )
            Navigate('/login')
        } catch{
            setError("Failed to log out")
        }
    }

    return (
        <>
        {/* <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex justify-content-center align-items-center direction-column border p-4 flex-column bg-light' style={{width:"80vw"}}>
                <h2 className='w-100 text-center mb-5 text-dark'>Dashboard</h2>
                <p className='w-100 text-center'><Link to="/signup">Sign Up</Link></p>
                <p className='w-100 text-center'><Link to="/login">Log In</Link></p>
                <div>
                    <h3>Current User: </h3>
                    <p>{currentUser && currentUser.email}</p>
                </div>
            </div>
        </div> */}
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h3>Current User: </h3>
                    <p>{currentUser && currentUser.email}</p>
                    <Link to={'/update-profile'} className="btn btn-primary w-100">Update profile</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}
