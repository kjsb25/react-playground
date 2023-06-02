import React from 'react';
import './Home.css';
import Counter from './Counter';
import Collapsable from './Collapsable';
import Links from './Links';
import AppCard from './AppCard';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';

type CardType = { title: string; component: React.ReactNode };

const cards: Array<CardType> = [
  { title: 'Counter', component: <Counter /> },
  { title: 'Collapsable', component: <Collapsable /> },
  { title: 'Links', component: <Links /> },
];

function Home() {
  return (
    <div className="Home">
      <CardGroup>
        <Container fluid>
          <Row>
            {cards.map((card) => (
              <Col>
                <AppCard title={card.title} childComponent={card.component} />
              </Col>
            ))}
          </Row>
          <Card>test</Card>
          <Card>test</Card>
          <Card>test</Card>
          <Card>test</Card>
          <Card>test</Card>
        </Container>
      </CardGroup>
    </div>
  );
}

export default Home;
