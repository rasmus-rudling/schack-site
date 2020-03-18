import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './createNewGame.css';

// --- Bootstrap ---
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import { Col, Row, Card } from 'react-bootstrap';
// -----------------


const CreateNewGame = () => {
    const [gamePassword, setGamePassword] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomPasswrod, setRoomPassword] = useState('');
    const [gameLength, setGameLength] = useState(10);


    const submitNewGame = event => {
        event.preventDefault();
        console.log('Nytt parti skapat')
    }

    return (
        <Container>
            <Row>
                <Col md={3}></Col>

                <Col md={6}>
                    <Card border="dark" className='form-card'>
                        <Card.Header>Skapa nytt parti</Card.Header>
                        
                        <Card.Body>
                            <Form onSubmit={event => submitNewGame(event)} className='login-form'>  
                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Form.Label>Namn på rum</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>♛</InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="text"
                                                placeholder="Namn"
                                                required
                                                id="email"
                                                onChange={event => {
                                                    setGamePassword(event.target.value);
                                                }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Form.Label>Lösenord (valfritt)</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>🔑</InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="text"
                                                placeholder="Lösenord"
                                                required
                                                id="email"
                                                onChange={event => {
                                                    setGamePassword(event.target.value);
                                                }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Form.Label>Längd på parti (minuter per spelare)</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>⏳</InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="text"
                                                placeholder="Längd"
                                                required
                                                id="email"
                                                onChange={event => {
                                                    setGamePassword(event.target.value);
                                                }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="10">
                                        <Form.Label>Din färg</Form.Label>

                                        <Form.Control as="select" custom defaultValue='Slumpmässig'>
                                            <option>Vit</option>
                                            <option>Svart</option>
                                            <option>Slumpmässig</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="1" />

                                    <Form.Group as={Col} md="3">
                                        <Link to='/lobby'>
                                            <Button variant="outline-dark" className='createNewGame-btn'>
                                                Tillbaka
                                            </Button>
                                        </Link>
                                        
                                    </Form.Group>

                                    <Form.Group as={Col} md="4" />

                                    <Form.Group as={Col} md="3">
                                        <Button variant="dark" type="submit" className='createNewGame-btn'>
                                            Skapa parti
                                        </Button>
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


export default CreateNewGame;