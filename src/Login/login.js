import React from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const firebase = require('firebase');

function Login() {
    return (
        <Container>
            <Form>  
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                            />

                            <Form.Control.Feedback type="invalid">
                                Var vänlig och välj ett användarnamn.
                            </Form.Control.Feedback>
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
                            />

                            <Form.Control.Feedback type="invalid">
                                Var vänlig och välj ett användarnamn.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Label>
                        <Link to='/signup'>
                            Har du inget konto? Tryck här för att skapa ett!
                        </Link>
                    </Form.Label>
                </Form.Row>

                <Button type="submit">Logga in</Button>

            </Form>
        </ Container>
    )
}

export default Login;