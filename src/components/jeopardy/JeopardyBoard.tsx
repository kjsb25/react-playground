import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import useJCategories from '../../hooks/useJCategories';
import Board from './Board';

function JeopardyBoard() {
  const { categories, refetch, isLoading } = useJCategories();
  const [score, setScore] = useState(0);

  function refreshBoard() {
    refetch({});
  }

  function updateScore(add: number) {
    setScore(score + add);
  }

  return (
    <>
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
      <h2>Points: {score}</h2>
      {isLoading && <Spinner></Spinner>}
      {!isLoading && (
        <Board categories={categories} updateScore={updateScore} />
      )}
    </>
  );
}

export default JeopardyBoard;
