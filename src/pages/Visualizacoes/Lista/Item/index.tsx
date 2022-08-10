import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

// TODO: fetch method inside component.
import barsFilledFull from './images/bars-filled-full.svg';
import barsHorizontal from './images/bars-horizontal.svg';
import bubbles from './images/bubbles.svg';
import donuts from './images/donuts.svg';
import lines from './images/lines.svg';
import linesFilled from './images/lines-filled.svg';
import linesFilledFull from './images/lines-filled-full.svg';
import mapNetwork from './images/map-network.svg';
import mountain from './images/mountain.svg';


export type visualizationType = 'barsFilledFull' 
  | 'barsHorizontal' 
  | 'bubbles' 
  | 'donuts' 
  | 'lines' 
  | 'linesFilled' 
  | 'linesFilledFull' 
  | 'mapNetwork' 
  | 'mountain';

interface ItemProps {
  label: string;
  linkTo: string;
  title: string;
  type: visualizationType;
}


function Item(props: ItemProps) {

  const getSource = useCallback((type: visualizationType) => {
    switch (type) {
      case 'barsFilledFull': return barsFilledFull;
      case 'barsHorizontal': return barsHorizontal;
      case 'bubbles': return bubbles;
      case 'donuts': return donuts;
      case 'lines': return lines;
      case 'linesFilled': return linesFilled;
      case 'linesFilledFull': return linesFilledFull;
      case 'mapNetwork': return mapNetwork;
      case 'mountain': return mountain;
    } 
  }, []);
  
  return (
    <article className="listItem">
      <Link to={props.linkTo}>
        <figure>
          <img 
            src={getSource(props.type)} 
            alt={`Imagem que representa gráfico ${props.title}`}
          />
        </figure>
        {/* <p></p> */}
        <h2>{props.title}</h2>
      </Link>
    </article>
  );
}

export default Item;