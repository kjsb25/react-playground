import { useState } from 'react';
import {
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Spinner,
} from 'react-bootstrap';
import useJCategories from '../../hooks/useJCategories';
import { GameType } from '../types/JeopardyTypes';
import Board from './Board';
import styles from './css/JeopardyBoard.module.css';
import FinalJeopardy from './FinalJeopardy';

function JeopardyBoard() {
  const { categories, refetch, isLoading } = useJCategories();
  const [score, setScore] = useState(0);
  const [gameType, setGameType] = useState(GameType.REGULAR);

  function refreshBoard() {
    refetch({});
  }

  function double() {
    setGameType(GameType.DOUBLE);
    refreshBoard();
  }

  function final() {
    setGameType(GameType.FINAL);
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
                <NavDropdown.Item onClick={double}>
                  Double Jeopardy
                </NavDropdown.Item>
                <NavDropdown.Item onClick={final}>
                  Final Jeopardy
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="justify-content-end">
              Score: {score}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className={styles.bodyContainer}>
        {gameType !== GameType.FINAL && isLoading && (
          <Row>
            <Col xs={5}></Col>
            <Col xs={2}>
              <Spinner
                className={styles.spinner}
                style={{ width: '10rem', height: '10rem' }}
              ></Spinner>
            </Col>
            <Col xs={5}></Col>
          </Row>
        )}
        {gameType !== GameType.FINAL && !isLoading && (
          <Board
            categories={categories}
            gameType={gameType}
            updateScore={updateScore}
          />
        )}
        {gameType === GameType.FINAL && <FinalJeopardy />}
      </Container>
    </>
  );
}

export default JeopardyBoard;
