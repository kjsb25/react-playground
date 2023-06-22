import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Category } from '../types/JeopardyTypes';
import BoardCard from './BoardCard';
import CategoryCard from './CategoryCard';
import styles from './css/JeopardyBoard.module.css';

interface Props {
  categories: Category[];
  updateScore: (scoreToAdd: number) => void;
}

const Values = [200, 400, 600, 800, 1000];

function Board(props: Props) {
  return (
    <Container className={styles.boardContainer}>
      <Row className={styles.boardRow}>
        {props.categories.map((category) => {
          return <CategoryCard key={category.id} category={category} />;
        })}
      </Row>
      {props.categories &&
        [...Array(Values.length)].map((questionRow, rowIndex) => {
          return (
            <Row key={rowIndex} className={styles.boardRow}>
              {[...Array(props.categories.length)].map(
                (questionItem, columnIndex) => {
                  const category_id = props.categories[columnIndex].id;
                  const value = Values[rowIndex].toString() || '200';
                  return (
                    <BoardCard
                      key={rowIndex + columnIndex}
                      category_id={category_id}
                      value={value}
                      addToScore={props.updateScore}
                    />
                  );
                }
              )}
            </Row>
          );
        })}
    </Container>
  );
}

export default Board;
