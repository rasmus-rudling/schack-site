import React, { useState } from 'react';
import './signup.css';
import '../index.css';

// --- Bootstrap ---
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// -----------------

import { Col, Row, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { passwordEqual } from '../Utilities/utilities';

const firebase = require('firebase');

const Signup = () => {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surName, setSurname] = useState('');
    const [show, setShow] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorText, setErrorText] = useState('');
    const [signupErrorBoxClasses, setSignupErrorBoxClasses] = useState('');

    const history = useHistory();

    // DETTA SKA VARA I EN ENSKILD FIL SOM HANTERAR LOGIK!!!!!!
    
    const submitSignupForm = event => {
        event.preventDefault(); //Hindrar formuläret från att uppdatera sidan

            let errorMessage = '';

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
                errorMessage = error.message;
                console.log(errorMessage)

            }).then(() => {
                if (errorMessage === 'The email address is already in use by another account.') {
                    setErrorTitle('Mailadressen finns redan!')
                    setErrorText(<p>Mailen "{email}" är redan registrerad till en användare. Klicka <Link to='/login'>HÄR</Link> för att återställa ditt lösenord och <Link to='/login'>HÄR</Link> för att logga in</p>)
                    setShow(true)

                    document.getElementById('email').focus();

                    setTimeout(() => {
                        setSignupErrorBoxClasses('');
                    }, 1000);

                    setSignupErrorBoxClasses(_errorBoxClasses => _errorBoxClasses + ' signup-error-msg');
                } else if (errorMessage === 'The email address is badly formatted.') {
                    setErrorTitle('Felformaterad mailadress!')
                    setErrorText(<p>Mailen "{email}" är inte korrekt formaterad.</p>)
                    setShow(true)

                    document.getElementById('email').focus();

                    setTimeout(() => {
                        setSignupErrorBoxClasses('');
                    }, 1000);

                    setSignupErrorBoxClasses(_errorBoxClasses => _errorBoxClasses + ' signup-error-msg');
                } else if (errorMessage === 'Password should be at least 6 characters') {
                    setErrorTitle('Svagt lösenord!')
                    setErrorText(<p>Lösenordet måste åtminstone vara 6 karaktärer långt.</p>)
                    setShow(true)

                    document.getElementById('password').focus();

                    setTimeout(() => {
                        setSignupErrorBoxClasses('');
                    }, 1000);

                    setSignupErrorBoxClasses(_errorBoxClasses => _errorBoxClasses + ' signup-error-msg');
                } else if (!passwordEqual(password, passwordCheck)) {
                    setTimeout(() => {
                        setSignupErrorBoxClasses('');
                        console.log('Nu03')
                    }, 1000);
        
                    setErrorTitle('Lösenorden matchar inte!')
                    setErrorText('Se till så att lösenorden matchar så att du inte glömmer vilket du valde.')
                    setShow(true)
                    setSignupErrorBoxClasses(_errorBoxClasses => _errorBoxClasses + ' signup-error-msg');
                } else {
                    firebase.auth().onAuthStateChanged(user => {
                        if (user) {
                            firebase.firestore().collection("users").doc(email).set({
                                email: email,
                                firstName: firstName,
                                surName: surName,
                                gamesWon: 0,
                                gamesLost: 0,
                                gamesDraw: 0

                            }).then(history.push('/lobby'))
                        } else {
                            console.log('Ingen användare loggades in') // Detta borde aldrig hända
                        }
                    });
                }
            });                   
    }

    return (
        <Container className='signup-container'>
            <Row>
                <Col md={2}></Col> 

                <Col md={8}>
                    <Card border="primary" className='form-card'>
                        <Card.Header>Skapa ny profil</Card.Header>

                        <Card.Body>
                            <Form onSubmit={event => submitSignupForm(event)} className='signup-form'>
                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="5">
                                        <Form.Label>Förnamn</Form.Label>
                                        <Form.Control
                                        required
                                        type="text"
                                        placeholder="Förnamn"
                                        autoFocus
                                        onChange={event => {
                                            setFirstName(event.target.value)
                                        }}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="5">
                                        <Form.Label>Efternamn</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Efternamn"
                                            onChange={event => {
                                                setSurname(event.target.value)
                                            }}  
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Form.Label>Mail</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend">✉</InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="email"
                                                placeholder="Mail"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                id="email"
                                                onChange={ e => {
                                                    setEmail(e.target.value)
                                                }}  
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="5">
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
                                                id="password"
                                                onChange={ e => {
                                                    setPassword(e.target.value)
                                                }}  
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="5">
                                        <Form.Label>Skriv in lösenord igen</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend">🔑</InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="password"
                                                placeholder="Skriv in lösenord igen"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                onChange={event => {
                                                    setPasswordCheck(event.target.value)
                                                }}  
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />
                                    
                                    <Form.Group as={Col} md="10">
                                        <Link to='/login' className='signup-link-in-form'>
                                            Har du redan ett konto? Tryck här för att logga in!
                                        </Link>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="4" />

                                    <Form.Group as={Col} md="4">
                                        <Button type="submit" className='signup-submit-btn'>Gå med</Button>
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        {
                                            show ? (  
                                                <Alert variant="danger" className={signupErrorBoxClasses} onClose={() => setShow(false)} dismissible>
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

                <Col md={2} className='signup-side'></Col>
            </Row>

        </Container>
    )
}

export default Signup;