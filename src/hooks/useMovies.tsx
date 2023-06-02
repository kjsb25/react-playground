import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { movieActions, basicSearch } from '../components/types/MovieTypes';

const baseURL = 'https://www.omdbapi.com/';

const params = {
  s: 'transformers',
  apiKey: process.env.REACT_APP_OMDB_API_KEY || '',
};

export default function useMovies(props: basicSearch) {
  const [movies, setMovies] = useState([]);

  //   const reducer = (state, action) => {
  //       switch
  //   };

  //   const [state, dispatch] = useReducer(reducer, props);

  useEffect(() => {
    let url: string = baseURL;
    if (props.searchString) {
      params.s = props.searchString;
    }
    const searchParams = new URLSearchParams(params);
    url = url.concat('?', searchParams.toString());
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.searchString]);

  return movies;
}
