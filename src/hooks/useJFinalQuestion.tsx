import { useState, useEffect } from 'react';
import axios from 'axios';
import {  Question } from '../components/types/JeopardyTypes';

const baseURL = 'https://jservice.io/api/final';

export default function useJFinalQuestion() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [question, setQuestion] = useState<Question>();
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    setIsLoading(true);
    let url: string = baseURL;
    axios
      .get(url)
      .then((response) => {
        setQuestion(response.data[0]);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, [shouldRefetch]);

  return { isLoading, isError, question, refetch };
}
