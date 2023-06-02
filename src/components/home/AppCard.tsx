import React from 'react';
import { Card } from 'react-bootstrap';
import './AppCard.css';

interface CardDetails {
  title: string;
  childComponent: React.ReactNode;
}

function AppCard(props: CardDetails) {
  return (
    <Card className="AppCard">
      <Card.Title className="cardTitle">{props.title}</Card.Title>
      <Card.Body>{props.childComponent}</Card.Body>
    </Card>
  );
}

export default AppCard;
