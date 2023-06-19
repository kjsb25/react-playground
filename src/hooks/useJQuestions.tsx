import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category, Question } from '../components/types/JeopardyTypes';
import hardcodedBoard from '../data/questions.json';

const baseURL = 'https://jservice.io/api/clues';

type ClueParams = {
  category: string;
  value: string;
};

const JSON_LOAD = true;

const Values = [200, 400, 800, 1000];

export default function useJQuestions(categories: Array<Category>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState<Array<Array<Question>>>(
    Array(5).fill(Array(5))
  );

  const fetchQuestion = async (
    category_id: string,
    score: number
  ): Promise<Question> => {
    const params: ClueParams = {
      category: category_id,
      value: score.toString(),
    };

    const searchParams = new URLSearchParams(params);
    let url: string = baseURL;

    url = url.concat('?', searchParams.toString());

    return axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setIsError(false);
        return response.data;
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!JSON_LOAD) {
      categories.map((category, rowIndex) => {
        Values.map(async (score, columnIndex) => {
          let currQuestion = await fetchQuestion(category.id, score);
          let newBoard = [...questions];
          newBoard[rowIndex][columnIndex] = currQuestion;

          setQuestions(newBoard);
          console.log(JSON.stringify(currQuestion));
        });
      });
    } else {
      setQuestions(hardcodedBoard);
    }
  }, [categories, questions]);

  return { isLoading, isError, categories, questions };
}
