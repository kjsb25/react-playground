import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Collapsable() {
  const [isCollapsed, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!isCollapsed);
  };

  return (
    <div className="Collapsable">
      <Button variant="primary" onClick={toggleCollapse}>
        Collapse
      </Button>
      <br />
      <img
        className={`${isCollapsed ? 'collapse' : ''}`}
        src="/img/ln.svg"
      ></img>
    </div>
  );
}

export default Collapsable;
