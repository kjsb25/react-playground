import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEventHandler } from 'react';
import { Col, FloatingLabel, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './SearchForm.module.css';

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function SearchForm(props: Props) {
  return (
    <Form onSubmit={props.onSubmit}>
      <Row>
        <Form.Group as={Col} controlId="searchString">
          <FloatingLabel controlId="floatingInput" label="Search">
            <Form.Control
              type="query"
              placeholder="Enter query"
              name="searchString"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group
          as={Col}
          controlId="submitButton"
          xs={1}
          className={styles.buttonContainer}
        >
          <Button variant="outline-dark" size="lg" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
}

export default SearchForm;
