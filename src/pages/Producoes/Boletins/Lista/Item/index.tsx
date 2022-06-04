import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';


interface ItemProps {
  date: string;
  linkTo: string;
  short: string;
  title: string;
}


function Item(props: ItemProps) {
  return (
    <article className="listItem">
      <Link to={props.linkTo}>
        <h2>{props.title}</h2>
        <p className="date">{props.date}</p>
        <p>{props.short}</p>
      </Link>
    </article>
  );
}

export default Item;