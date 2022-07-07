import { ReactNode, useState } from "react";
// import { Link } from "react-router-dom";

import { Modal as MuiModal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import styles from './styles.module.css';


export interface DialogProps {
  children: ReactNode;
  iframe: boolean;
  open: boolean;
  onClose: () => void;
  title?: string;
}


function Modal(props: DialogProps){
  return (
    <MuiModal
      className={styles.MuiModal}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.MuiModalContent + ' ' + (props.iframe && styles.MuiModalContentIframe)}>
        <header className={styles.MuiModalContentHeader}>
          <h1>{props.title}</h1>
          <IconButton
            color="primary"
            component="button"
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </header>
        {props.children}
      </div>
    </MuiModal>
  );
}

export default Modal;