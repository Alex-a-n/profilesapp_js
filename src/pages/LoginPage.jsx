// src/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

function LoginPage() {
    const navigate = useNavigate();
    const { user } = useAuthenticator((context) => [context.user]);

    useEffect(() => {
        if (user) {
            navigate('/');   // If user is already logged in, redirect to home page
        }
    }, [user, navigate]);

    return (
        <div className="auth-container" style={{ textAlign: 'center' }}>
            <Authenticator
                loginMechanisms={['email']}
                signUpAttributes={['email']}

                components={{
                    SignIn: {
                        Header: () => (
                            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                    Welcome to CozyRead
                                </h2>
                                <p style={{ fontSize: '1rem' }}>
                                    Please sign in or sign up to continue
                                </p>
                            </div>
                        )
                    },
                    SignUp: {
                        Header: () => (
                            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                    Register a new account
                                </h2>
                            </div>
                        )
                    }
                }}
            />
        </div>
    );
}

export default LoginPage;
