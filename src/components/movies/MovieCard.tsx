import { Card, Col, Image } from 'react-bootstrap';
import { Movie } from '../types/MovieTypes';
import styles from './MovieCard.module.css';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

type Props = {
  movie: Movie;
};

const MovieCard = (props: Props) => {
  const poster =
    props.movie.Poster === 'N/A'
      ? DEFAULT_PLACEHOLDER_IMAGE
      : props.movie.Poster;
  return (
    <Card className={styles.movieCard} as={Col} xs={2}>
      <Card.Title style={{ margin: 12 }}>{props.movie.Title}</Card.Title>
      <Card.Body>
        <Image
          width="200"
          alt={`The movie titled: ${props.movie.Title}`}
          src={poster}
          rounded
        />
      </Card.Body>
      <Card.Footer>
        <p>({props.movie.Year})</p>
      </Card.Footer>
    </Card>
  );
};

export default MovieCard;
