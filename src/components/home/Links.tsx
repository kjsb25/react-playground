import React from 'react';
import { Link } from 'react-router-dom';

function Links() {
  return (
    <>
      <Link to="/movies">Movies</Link>
      <br />
      <Link to="/jeopardy">Jeopardy</Link>
    </>
  );
}

export default Links;
