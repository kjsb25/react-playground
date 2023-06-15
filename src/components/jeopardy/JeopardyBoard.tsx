import React from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from 'react-bootstrap';
import useJCategories from '../../hooks/useJCategories';
import BoardCard from './BoardCard';

function JeopardyBoard() {
  const { categories, refetch } = useJCategories();
  // const { questions } = useJQuestions(categories);

  function refreshBoard() {
    refetch({});
  }

  return (
    <div className="JeopardyBoard">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Jeopardy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Actions" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={refreshBoard}>
                  New Board
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          {categories.map((category) => {
            return (
              <Col key={category.id}>
                <Card className="text-center">
                  <Card.Body>{category.title} </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default JeopardyBoard;
