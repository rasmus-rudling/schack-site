import React, { useState } from 'react';
import './signup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
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

    function passwordEqual(pass1, pass2) {
        return pass1 === pass2;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={e => {
                        e.preventDefault(); //Hindrar formuläret från att uppdatera sidan
                        console.log('Hej01')
                        if (!passwordEqual(password, passwordCheck)) {
                            setErrorTitle('Lösenorden matchar inte!')
                            setErrorText('Se till så att lösenorden matchar så att du inte glömmer vilket du valde.')
                            setShow(true)
                        } else {
                            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(`${errorCode}: ${errorMessage}`)
                            });
                            
                            firebase
                                .firestore()
                                .collection("users").doc(email).set({
                                    firstName: firstName
                                }).then(() => console.log('Användare skapad!')) // Massa kvar att göra här men det funkar!!!
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
                                <Link to='/login'>
                                    Har du redan ett konto? Tryck här för att logga in!
                                </Link>
                            </Form.Label>
                        </Form.Row>

                        <Button type="submit">Gå med</Button>

                    </Form>
                </Col>
            </Row>
            

            <Row>
                <Col md={6}>
                    {
                        show ? (
                        
                            <Alert variant="danger" className='error-msg' onClose={() => setShow(false)} dismissible>
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