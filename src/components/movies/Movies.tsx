import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import MovieCard from './MovieCard';
import SearchForm from './SearchForm';
import useMovies from '../../hooks/useMovies';
import { Movie, basicSearch } from '../types/MovieTypes';

function Movies() {
  const [movieQuery, setMovieQuery] = useState({});
  const movies = useMovies(movieQuery);

  function handleSearchChange(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchString: { value: string };
    };
    console.log(target);
    setMovieQuery({
      searchString: target.searchString.value,
    });
  }

  return (
    <div className="movies">
      <h1>Movies</h1>
      <SearchForm onSubmit={handleSearchChange} />
      <Container fluid>
        <Row>
          {movies.map((currMovie: Movie, index) => {
            return <MovieCard movie={currMovie} key={index} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Movies;
