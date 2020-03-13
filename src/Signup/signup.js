import React, { useState } from 'react';
import './signup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'


const firebase = require('firebase');

function Signup() {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surName, setSurname] = useState('');
    const [show, setShow] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorText, setErrorText] = useState('');
    const [signupErrorBoxClasses, setSignupErrorBoxClasses] = useState('signup-error-msg');

    const history = useHistory();

    function passwordEqual(pass1, pass2) {
        return pass1 === pass2;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={e => {
                        e.preventDefault(); //Hindrar formuläret från att uppdatera sidan
                        
                        setTimeout(() => {
                            setSignupErrorBoxClasses('signup-error-msg')
                        }, 1500);

                        if (!passwordEqual(password, passwordCheck)) {
                            setErrorTitle('Lösenorden matchar inte!')
                            setErrorText('Se till så att lösenorden matchar så att du inte glömmer vilket du valde.')
                            setShow(true)
                        } else {
                            let errorMessage = '';

                            firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
                                errorMessage = error.message;
                            }).then(() => {
                                if (errorMessage === 'The email address is already in use by another account.') {
                                    setErrorTitle('Mailadressen finns redan!')
                                    setErrorText(<p>Mailen "{email}" är redan registrerad till en användare. Klicka <Link to='/login'>HÄR</Link> för att återställa ditt lösenord och <Link to='/login'>HÄR</Link> för att logga in</p>)
                                    setShow(true)

                                    setSignupErrorBoxClasses(_errorBoxClasses => _errorBoxClasses + ' signup-error-msg-animation');
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

                                            }).then(history.push('/homepage'))
                                        } else {
                                            console.log('Ingen användare loggades in') // Detta borde aldrig hända
                                        }
                                    });
                                }
                            });

                                                        
                        }
                    }}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Förnamn</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Förnamn"
                                onChange={ e => {
                                    setFirstName(e.target.value)
                                }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Efternamn</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Efternamn"
                                    onChange={ e => {
                                        setSurname(e.target.value)
                                    }}  
                                />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                                        
                                        onChange={ e => {
                                            setEmail(e.target.value)
                                        }}  
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                                        onChange={ e => {
                                            setPassword(e.target.value)
                                        }}  
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                                        onChange={ e => {
                                            setPasswordCheck(e.target.value)
                                        }}  
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label>
                                <Link to='/login' className='signup-link-in-form'>
                                    Har du redan ett konto? Tryck här för att logga in!
                                </Link>
                            </Form.Label>
                        </Form.Row>

                        <Button type="submit" className='signup-submit-btn'>Gå med</Button>

                    </Form>
                </Col>
            </Row>
            

            <Row>
                <Col md={8}>
                    {
                        show ? (
                        
                            <Alert variant="danger" className={signupErrorBoxClasses} onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>{errorTitle}</Alert.Heading>
                                <p>
                                    {errorText}
                                </p>
                            </Alert>
                        ) : (<div></div>)
                    }
                </ Col>
            </Row>
        </ Container>
    )
}

export default Signup;