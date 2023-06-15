import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '../components/types/JeopardyTypes';

const baseURL = 'https://jservice.io/api/categories';

const params = { count: '5' };

export default function useJCategories() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setIsLoading(true);
    let url: string = baseURL;
    const searchParams = new URLSearchParams(params);
    url = url.concat('?', searchParams.toString());
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return { isLoading, isError, categories };
}
