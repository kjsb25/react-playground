import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="Counter">
      <Button variant="primary" onClick={() => setCounter(counter - 1)}>
        -
      </Button>
      <span> {counter} </span>
      <Button variant="primary" onClick={() => setCounter(counter + 1)}>
        +
      </Button>
    </div>
  );
}

export default Counter;
