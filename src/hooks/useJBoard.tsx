import { useState, useEffect } from 'react';
import axios from 'axios';
import { Board, Category, Column } from '../components/types/JeopardyTypes';
import useJCategories from './useJCategories';
import useJQuestions from './useJQuestions';

const baseURL = 'https://jservice.io/api/categories';

const HIGHEST_CAT_ID = 20000;

const CAT_COUNT = 5;

const params = { count: CAT_COUNT.toString(), offset: '0' };

export default function useJBoard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [board, setBoard] = useState<Board>();
  const { categories, refetch } = useJCategories();
  const { questions } = useJQuestions(categories);

  useEffect(() => {
    setIsLoading(true);
    refetch({});

    // const newBoard = { date: Date.now(), board: new Map<number, Column>() };

    // categories.map((currCategory) => {
    //   newBoard.board.set(currCategory.id);
    // });
  }, []);

  return { isLoading, isError, categories, questions, refetch };
}
