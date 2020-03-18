import React, { useState } from 'react';

// --- Egna CSS-filer ---
import './login.css';
import '../index.css';
// ----------------------

// --- Bootstrap ---
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row, Card } from 'react-bootstrap';
// -----------------

import {
    useHistory,
    Link
} from "react-router-dom";

const firebase = require('firebase');

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorText, setErrorText] = useState('');
    const [loginErrorBoxClasses, setLoginErrorBoxClasses] = useState('');

    function submitLoginForm(event) {
        event.preventDefault();
                        
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            history.push('/lobby');
        
        }, error => {
            let errorMessage = error.message;

            if (errorMessage === 'The email address is badly formatted.') {
                setErrorTitle('Nu blev det lite fel med mailen!')
                setErrorText('Din mail är inte korrekt formaterad.')
                setShow(true)
                document.getElementById('email').focus();
            } else if (errorMessage === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                setErrorTitle('Fel mailadress!')
                setErrorText(`Det finns ingen användare med mailen "${email}" i vår databas.`)
                setShow(true)
                document.getElementById('email').focus();
            } else if (errorMessage === 'The password is invalid or the user does not have a password.') {
                setErrorTitle('Fel lösenord!')
                setErrorText(`Lösenordet du angav matchar inte med mailen "${email}".`)
                setShow(true)
                document.getElementById('password').focus();
            } else if (errorMessage === 'Too many unsuccessful login attempts. Please try again later.') {
                setErrorTitle('För många misslyckade försök!')
                setErrorText(<p>Försök gärna igen om ett tag eller återställ ditt lösenord <Link to='/signup'>HÄR</Link>.</p>)
                setShow(true)
            }

            setTimeout(() => {
                setLoginErrorBoxClasses('')
            }, 1000);
            
            setLoginErrorBoxClasses(_errorBoxClasses => _errorBoxClasses + ' login-error-msg');
            console.log(error.message)
        }); 
    }

    return (
        <Container className='login-container'>
            <Row>
                <Col md={3}></Col> 

                <Col md={6}>
                    <Card border="primary" className='form-card'>
                        <Card.Header>Logga in</Card.Header>

                        <Card.Body>
                            <Form onSubmit={event => submitLoginForm(event)} className='login-form'>  
                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Form.Label>Mail</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>✉</InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="email"
                                                placeholder="Mail"
                                                required
                                                id="email"
                                                onChange={event => {
                                                    setEmail(event.target.value);
                                                }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Form.Label>Lösenord</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>🔑</InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="password"
                                                placeholder="Lösenord"
                                                required
                                                id="password"
                                                onChange={e => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Link to='/signup' className='login-link-in-form'>
                                            Har du inget konto? Tryck här för att skapa ett!
                                        </Link>
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Row className='login-btn-row'>
                                    <Form.Group as={Col} md="4" />

                                    <Form.Group as={Col} md="4">
                                        <Button type="submit" className='login-submit-btn'>Logga in</Button>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        {
                                            show ? (
                                            
                                                <Alert 
                                                    variant="danger"
                                                    className={loginErrorBoxClasses} 
                                                    onClose={() => {
                                                        setShow(false);
                                                    }}
                                                    dismissible
                                                >
                                                    <Alert.Heading>{errorTitle}</Alert.Heading>
                                                    
                                                    {errorText}
                                                    
                                                </Alert>
                                            ) : (<div></div>)
                                        }
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;