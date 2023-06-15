import React from 'react';
import { Card } from 'react-bootstrap';
import { Question } from '../types/JeopardyTypes';

interface CardDetails {
  title?: string;
  question?: Question;
}

function BoardCard(props: CardDetails) {
  return (
    <Card className="BoardCard">
      <Card.Body>{props.title}</Card.Body>
    </Card>
  );
}

export default BoardCard;
