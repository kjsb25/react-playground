import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '../components/types/JeopardyTypes';

const baseURL = 'https://jservice.io/api/categories';

const HIGHEST_CAT_ID = 20000;

const CAT_COUNT = 6;

const params = { count: CAT_COUNT.toString(), offset: '0' };

export default function useJCategories() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    setIsLoading(true);
    params.offset = Math.floor(Math.random() * HIGHEST_CAT_ID).toString();
    let url: string = baseURL;
    const searchParams = new URLSearchParams(params);
    url = url.concat('?', searchParams.toString());
    axios
      .get(url)
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, [shouldRefetch]);

  return { isLoading, isError, categories, refetch };
}
