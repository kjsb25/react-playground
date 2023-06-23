import React, { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Category } from '../types/JeopardyTypes';
import styles from './css/BoardCard.module.css';

interface CardDetails {
  category: Category;
}

function CategoryCard(props: CardDetails) {
  return (
    <>
      <Col>
        <Card className={`text-center ${styles.card} `}>
          {props.category && (
            <Card.Body className={styles.catTitle}>
              {props.category.title}
            </Card.Body>
          )}
        </Card>
      </Col>
    </>
  );
}

export default CategoryCard;
