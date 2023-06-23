import { Button, Card, Form } from 'react-bootstrap';
import useJFinalQuestion from '../../hooks/useJFinalQuestion';
import styles from './css/BoardCard.module.css';

function FinalJeopardy() {
  const { question, refetch, isLoading, isError } = useJFinalQuestion();

  function handleAnswerSubmit() {}

  return (
    <>
      <Card className={styles.card}>
        {!isLoading && !isError && question?.question && (
          <Card.Body className={styles.value}>{question?.question}</Card.Body>
        )}
        {isError && (
          <Card.Body className={styles.value}>
            Error: Question could not be loaded.
            <br></br>
          </Card.Body>
        )}
      </Card>
      <Form className={styles.answerForm} onSubmit={handleAnswerSubmit}>
        <Form.Control
          size="lg"
          type="text"
          id="answer"
          placeholder="Answer"
          aria-describedby="answer"
          autoFocus
          autoComplete="off"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>{' '}
      </Form>
    </>
  );
}

export default FinalJeopardy;
