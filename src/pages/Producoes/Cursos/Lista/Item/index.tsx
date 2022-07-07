import { useCallback, useState } from 'react';
import { Interweave } from 'interweave';
import { Link } from 'react-router-dom';

import Modal from '../../../../../components/Modal';

import './styles.css';

import logoR from './images/r.png';
import logoTidyverse from'./images/tidyverse.png';


interface ItemProps {
  id: string;
  url: string;
  short: string;
  title: string;
}


function Item(props: ItemProps) {
  const [open, setOpen] = useState(false);

  const onClickHandle = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  
  const onCloseHandle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const getLogoById = useCallback((id) => {
    switch(id) {
      case 'basico-linguagem-r': return logoR;
      case 'aprenda-a-utilizar-o-tidyverse': return logoTidyverse;
    }
  }, []);
  
  return (
    <article className="listItem">
      <div className="listItemContent" onClick={onClickHandle}>
        <figure>
          <img src={getLogoById(props.id)} alt="Logo" />
        </figure>
        <div className="listItemInfo">
          <h2>{props.title}</h2>
          <div><Interweave noWrap content={props.short} /></div>
        </div>
      </div>

      <Modal
        onClose={onCloseHandle}
        open={open}
        title={props.title}
        iframe={true}
      >
        <iframe
          src={props.url}
          title={props.title}
          style={{ maxWidth: '1400px', width: '95vw', height:'95vh', border: 'none' }}
        >
        </iframe>
      </Modal>
    </article>
  );
}

export default Item;