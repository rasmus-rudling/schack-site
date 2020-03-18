import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import { Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Lobby = () => {
    return (
        <Container>
            <Row>
                <Col md={1}></Col>

                <Col md={10}>
                    <Card border="dark" className='form-card'>
                        <Card.Header>Lobby</Card.Header>
                        
                        <Card.Body>
                            <Link to='/create-new-game'>
                                <Button variant='dark' className='lobby-new-game-btn'>
                                    Skapa nytt parti
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Lobby;