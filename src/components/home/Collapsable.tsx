import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';

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
      <Image
        className={`${isCollapsed ? 'collapse' : ''}`}
        src="./img/LoremIpsum.png"
        width="100"
      ></Image>
    </div>
  );
}

export default Collapsable;
