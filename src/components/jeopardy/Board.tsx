import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Alert, Row } from 'react-bootstrap';
import { Category } from '../types/JeopardyTypes';
import BoardCard from './BoardCard';
import CategoryCard from './CategoryCard';
import styles from './css/JeopardyBoard.module.css';

interface Props {
  categories: Category[];
  updateScore: (scoreToAdd: number) => void;
}

const Values = [200, 400, 600, 800, 1000];

const alertTimeout = 5000;

function Board(props: Props) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [modalText, setModalText] = useState('');

  function reportResult(
    isCorrect: boolean,
    value: number,
    rightAnswer: string
  ) {
    setModalText(`What is ${rightAnswer}`);
    if (isCorrect) {
      props.updateScore(value);
      setShowSuccessAlert(true);
    } else {
      setShowFailureAlert(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSuccessAlert(false);
      setShowFailureAlert(false);
    }, alertTimeout);
  }, [showSuccessAlert, showFailureAlert]);

  return (
    <Row>
      <Col xs={2}></Col>
      <Col xs={8}>
        <div className={styles.boardContainer}>
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
                          reportResult={reportResult}
                        />
                      );
                    }
                  )}
                </Row>
              );
            })}
        </div>
      </Col>
      <Col xs={2}>
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
          show={showSuccessAlert}
        >
          <Alert.Heading>Correct!</Alert.Heading>
          {modalText}
        </Alert>
        <Alert
          variant="danger"
          onClose={() => setShowFailureAlert(false)}
          dismissible
          show={showFailureAlert}
        >
          <Alert.Heading>Incorrect!</Alert.Heading>
          {modalText}
        </Alert>
      </Col>
    </Row>
  );
}

export default Board;
