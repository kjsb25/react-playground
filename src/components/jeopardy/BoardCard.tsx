import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Category, Question } from '../types/JeopardyTypes';
import styles from './css/BoardCard.module.css';

interface CardDetails {
  category?: Category;
  question?: Question;
}

function BoardCard(props: CardDetails) {
  return (
    <Col>
      <Card className={`text-center ${styles.card}`}>
        {props.category && <Card.Body>{props.category.title}</Card.Body>}
        {props.question?.question && (
          <Card.Body>{props.question?.question}</Card.Body>
        )}
      </Card>
    </Col>
  );
}

export default BoardCard;
