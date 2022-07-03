import { useCallback } from 'react';
import { Interweave } from 'interweave';
import { Link } from 'react-router-dom';

import './styles.css';

import logoR from './images/r.png'
import logoTidyverse from'./images/tidyverse.png'


interface ItemProps {
  id: string;
  linkTo: string;
  short: string;
  title: string;
}


function Item(props: ItemProps) {
  const getLogoById = useCallback((id) => {
    switch(id) {
      case 'basico-linguagem-r': return logoR;
      case 'aprenda-a-utilizar-o-tidyverse': return logoTidyverse;
    }
  }, []);
  
  return (
    <article className="listItem">
      <Link to={props.linkTo}>
        <figure>
          <img src={getLogoById(props.id)} alt="Logo" />
        </figure>
        <div className="listItemInfo">
          <h2>{props.title}</h2>
          <p><Interweave noWrap content={props.short} /></p>
        </div>
      </Link>
    </article>
  );
}

export default Item;