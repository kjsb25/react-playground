import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useJCategories from '../../hooks/useJCategories';
import BoardCard from './BoardCard';

function JeopardyBoard() {
  const { categories } = useJCategories();

  return (
    <div className="JeopardyBoard">
      <h1>Jeopardy</h1>
      <Container fluid>
        <Row>
          {categories.map((category) => {
            return (
              <Col key={category.id}>
                <BoardCard title={category.title} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default JeopardyBoard;
