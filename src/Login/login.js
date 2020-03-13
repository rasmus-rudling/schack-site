import React, { useState } from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import {
    useHistory,
    Link
} from "react-router-dom";

const firebase = require('firebase');

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorText, setErrorText] = useState('');
    const [loginErrorBoxClasses, setLoginErrorBoxClasses] = useState('login-error-msg');

    function submitLoginForm(event) {
        event.preventDefault();
                        
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            history.push('/homepage');
        
        }, error => {
            let errorMessage = error.message;

            if (errorMessage === 'The email address is badly formatted.') {
                setErrorTitle('Nu blev det lite fel med mailen!')
                setErrorText('Din mail är inte korrekt formaterad.')
                setShow(true)
            } else if (errorMessage === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                setErrorTitle('Fel mailadress!')
                setErrorText(`Det finns ingen användare med mailen "${email}" i vår databas.`)
                setShow(true)
            } else if (errorMessage === 'The password is invalid or the user does not have a password.') {
                setErrorTitle('Fel lösenord!')
                setErrorText(`Lösenordet du angav matchar inte med mailen "${email}".`)
                setShow(true)
            } else if (errorMessage === 'Too many unsuccessful login attempts. Please try again later.') {
                setErrorTitle('För många misslyckade försök!')
                setErrorText(<p>Försök gärna igen om ett tag eller återställ ditt lösenord <Link to='/signup'>HÄR</Link>.</p>)
                setShow(true)
            }

            setTimeout(() => {
                setLoginErrorBoxClasses('login-error-msg')
            }, 1000);
            
            setLoginErrorBoxClasses(_errorBoxClasses => _errorBoxClasses + ' login-error-msg-animation');
            console.log(error.message)
        }); 
    }

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Form onSubmit={event => submitLoginForm(event)}>  
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                                <Form.Label>Mail</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">✉</InputGroup.Text>
                                    </InputGroup.Prepend>

                                    <Form.Control
                                        type="text"
                                        placeholder="Mail"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={e => {
                                            setEmail(e.target.value);
                                        }}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Var vänlig och välj ett användarnamn.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                                <Form.Label>Lösenord</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">🔑</InputGroup.Text>
                                    </InputGroup.Prepend>

                                    <Form.Control
                                        type="password"
                                        placeholder="Lösenord"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={e => {
                                            setPassword(e.target.value);
                                        }}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Var vänlig och välj ett användarnamn.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label>
                                <Link to='/signup' className='login-link-in-form'>
                                    Har du inget konto? Tryck här för att skapa ett!
                                </Link>
                            </Form.Label>
                        </Form.Row>

                        <Button type="submit" className='login-submit-btn'>Logga in</Button>
                    </Form>
                </Col>
            </Row>
            
            <Row>
                <Col md={6}>
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
                </ Col>
            </Row>
            
        </ Container>
    )
}

export default Login;