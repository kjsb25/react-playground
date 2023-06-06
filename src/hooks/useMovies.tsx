import { useState, useEffect } from 'react';
import axios from 'axios';
import { movieSearchParams } from '../components/types/MovieTypes';

const baseURL = 'https://www.omdbapi.com/';

let params = {
  s: '',
  page: '',
  apiKey: process.env.REACT_APP_OMDB_API_KEY || '',
};

export default function useMovies(props: movieSearchParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let url: string = baseURL;
    params = { ...params, ...props };
    const searchParams = new URLSearchParams(params);
    url = url.concat('?', searchParams.toString());
    axios
      .get(url)
      .then((response) => {
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
          setIsError(false);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, [props]);

  return { isLoading, isError, movies };
}
