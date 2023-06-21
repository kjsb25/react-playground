import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import useJCategories from '../../hooks/useJCategories';
import useJQuestions from '../../hooks/useJQuestions';
import BoardCard from './BoardCard';
import styles from './css/JeopardyBoard.module.css';

function JeopardyBoard() {
  const { categories, refetch } = useJCategories();
  const { questions } = useJQuestions(categories);

  function refreshBoard() {
    refetch({});
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
      <Container className={styles.boardContainer}>
        <Row className={styles.boardRow}>
          {categories.map((category) => {
            return <BoardCard key={category.id} category={category} />;
          })}
        </Row>
        {questions.map((questionRow, index) => {
          return (
            <Row key={index} className={styles.boardRow}>
              {questionRow.map((question) => {
                return (
                  <BoardCard key={question.question} question={question} />
                );
              })}
            </Row>
          );
        })}
      </Container>
    </>
  );
}

export default JeopardyBoard;
