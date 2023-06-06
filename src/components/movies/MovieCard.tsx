import { useState } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { Movie } from '../types/MovieTypes';
import styles from './MovieCard.module.css';

const DEFAULT_PLACEHOLDER_IMAGE = './img/NotFound.png';

type Props = {
  movie: Movie;
};

const MovieCard = (props: Props) => {
  const [isPosterLoaded, setPosterLoaded] = useState(false);

  const poster =
    props.movie.Poster === 'N/A'
      ? DEFAULT_PLACEHOLDER_IMAGE
      : props.movie.Poster;

  function handleImageLoaded() {
    setPosterLoaded(true);
  }

  return (
    <Card className={styles.movieCard} as={Col} xs={2}>
      <Card.Title style={{ margin: 12 }}>{props.movie.Title}</Card.Title>
      <Card.Body className={styles.movieBody}>
        {!isPosterLoaded && (
          <Image
            width="200"
            alt={`The movie titled: ${props.movie.Title}`}
            src={DEFAULT_PLACEHOLDER_IMAGE}
            rounded
          />
        )}
        <Image
          width="200"
          alt={`The movie titled: ${props.movie.Title}`}
          src={poster}
          rounded
          style={isPosterLoaded ? {} : { display: 'none' }}
          onLoad={handleImageLoaded}
        />
      </Card.Body>
      <Card.Footer>
        <p>({props.movie.Year})</p>
      </Card.Footer>
    </Card>
  );
};

export default MovieCard;
