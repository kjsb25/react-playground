import React, { useState } from 'react';
import { Button, Card, Col, Form, Spinner } from 'react-bootstrap';
import { Category, Question } from '../types/JeopardyTypes';
import { motion } from 'framer-motion';
import styles from './css/BoardCard.module.css';
import axios from 'axios';

interface CardDetails {
  category_id: string;
  value: string;
  addToScore: (points: number) => void;
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
    if (answer === question.answer) {
      props.addToScore(Number.parseInt(question.value));
    }
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
        const randomIndex = Math.floor(Math.random() * returnLength);
        setQuestion(response.data[randomIndex]);
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
              question?.question && (
                <Card.Body className={styles.value}>
                  {question?.question}
                </Card.Body>
              )}
          </Card>
          {state === CardState.ANSWERING && !isLoading && (
            <Form className={styles.answerForm} onSubmit={handleAnswerSubmit}>
              <Form.Control
                size="lg"
                type="text"
                id="answer"
                placeholder="Answer"
                aria-describedby="answer"
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
