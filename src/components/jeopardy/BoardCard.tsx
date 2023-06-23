import React, { useState } from 'react';
import { Button, Card, CloseButton, Col, Form, Spinner } from 'react-bootstrap';
import { Question } from '../types/JeopardyTypes';
import { motion } from 'framer-motion';
import styles from './css/BoardCard.module.css';
import axios from 'axios';

interface CardDetails {
  category_id: string;
  value: string;
  reportResult: (correct: boolean, points: number, rightAnswer: string) => void;
}

const initialState: Question = {
  completed: false,
  value: '',
  question: 'Loading...',
  answer: 'Loading...',
};

const baseURL = 'https://jservice.io/api/clues';

enum CardState {
  OPEN,
  ANSWERING,
  ANSWERED,
}

function BoardCard(props: CardDetails) {
  const [state, setState] = useState(CardState.OPEN);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [question, setQuestion] = useState(initialState);

  function handleClick() {
    if (state === CardState.OPEN) {
      fetchQuestion();
      setState(CardState.ANSWERING);
    }
  }

  function handleAnswerSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      answer: { value: string };
    };
    const answer = target.answer.value;

    props.reportResult(
      answer.toLowerCase() === question.answer.toLowerCase(),
      Number.parseInt(question.value),
      question.answer
    );

    setState(CardState.ANSWERED);
  }

  function errorRecover() {
    setState(CardState.ANSWERED);
  }

  const fetchQuestion = () => {
    setIsLoading(true);
    const params = {
      category: props.category_id,
      value: props.value,
    };

    const searchParams = new URLSearchParams(params);
    let url: string = baseURL;

    url = url.concat('?', searchParams.toString());

    return axios
      .get(url)
      .then((response) => {
        const returnLength = response.data.length;
        if (returnLength > 0) {
          const randomIndex = Math.floor(Math.random() * returnLength);
          setQuestion(response.data[randomIndex]);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(isError);
      });
  };

  return (
    <>
      <Col>
        <motion.div
          layout
          className={state === CardState.ANSWERING ? styles.cardContainer : ''}
        >
          <Card
            onClick={handleClick}
            className={`text-center ${styles.card} ${
              state === CardState.ANSWERING ? styles.expandedCard : ''
            }`}
          >
            {state === CardState.OPEN && question?.question && (
              <Card.Body
                className={styles.value}
              >{`$${props.value}`}</Card.Body>
            )}
            {state === CardState.ANSWERING && isLoading && (
              <Card.Body className={styles.value}>
                <Spinner animation="border" role="status" />
              </Card.Body>
            )}
            {state === CardState.ANSWERING &&
              !isLoading &&
              !isError &&
              question?.question && (
                <Card.Body className={styles.value}>
                  {question?.question}
                </Card.Body>
              )}
            {state === CardState.ANSWERING && isError && (
              <Card.Body className={styles.value}>
                Error: Question could not be loaded.
                <br></br>
                <CloseButton onClick={errorRecover} />
              </Card.Body>
            )}
          </Card>
          {state === CardState.ANSWERING && !isLoading && !isError && (
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
          )}
        </motion.div>
      </Col>
    </>
  );
}

export default BoardCard;
