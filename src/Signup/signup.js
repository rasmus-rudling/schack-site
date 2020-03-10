import React from 'react';
import './signup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


const firebase = require('firebase');

function Signup() {
    return (
        <Container>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Förnamn</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        placeholder="Förnamn"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Efternamn</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        placeholder="Efternamn"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                            />

                            <Form.Control.Feedback type="invalid">
                                Var vänlig och välj ett användarnamn.
                            </Form.Control.Feedback>
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
        </ Container>
    )
}

export default Signup;