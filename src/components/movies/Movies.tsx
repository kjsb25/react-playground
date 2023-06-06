import { useState } from 'react';
import { Alert, Container, Row, Spinner } from 'react-bootstrap';
import MovieCard from './MovieCard';
import SearchForm from './SearchForm';
import Paging from './Paging';
import useMovies from '../../hooks/useMovies';
import { Movie } from '../types/MovieTypes';
import styles from './Movies.module.css';

const initialParams = {
  s: 'transformers',
  page: '1',
};

function Movies() {
  const [movieQuery, setMovieQuery] = useState(initialParams);
  const { movies, isLoading, isError } = useMovies(movieQuery);

  function handleSearchChange(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchString: { value: string };
    };
    setMovieQuery({
      ...movieQuery,
      s: target.searchString.value,
      page: '1',
    });
  }

  function handlePageChange(newPage: number) {
    setMovieQuery({
      ...movieQuery,
      page: newPage.toString(),
    });
  }

  return (
    <div className={styles.mainContainer}>
      <Container className={styles.header}>
        <h1 className={styles.title}>Movie Search</h1>
        <SearchForm onSubmit={handleSearchChange} />
      </Container>
      <Container fluid className={styles.results}>
        {isLoading ? (
          <Spinner className={styles.spinner} animation="border" />
        ) : isError || movies.length === 0 ? (
          <Alert variant="info">No results for this search</Alert>
        ) : (
          <Row className={styles.row}>
            {movies.map((currMovie: Movie, index) => {
              return <MovieCard movie={currMovie} key={index} />;
            })}
          </Row>
        )}
      </Container>
      <Paging
        onPageSelect={handlePageChange}
        activeKey={Number(movieQuery.page) || 1}
        numPages={10}
      />
    </div>
  );
}

export default Movies;
