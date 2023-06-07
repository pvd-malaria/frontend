import { Link } from 'react-router-dom';
import { Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import React, { useRef } from 'react';
// import pdf from "../../../../../../public/artigos/teste.pdf"

import './styles.css';


interface ItemProps {
  date: string;
  linkTo: string;
  short: string;
  title: string;
  pdf: string;
  urlPdf: string;
  urlExternal: string;
  id: string;
}

const pub = "../../../../../public"

const downloadFile = (url: string) => {
  fetch(url)
	.then((response) => response.blob())
	.then((blob) => {
		const blobURL = window.URL.createObjectURL(new Blob([blob]));
		const fileName = url.split("/").pop() as string;
		const aTag = document.createElement('a');
    aTag.href = blobURL
		aTag.setAttribute("download", fileName);
		document.body.appendChild(aTag);
		aTag.click();
		aTag.remove();
	});
};

function Item(props: ItemProps) {
  return (
    <article className="listItem">
      <Link to={props.linkTo} style={{ position: "relative" }} onClick={(e) => { e.preventDefault() }}>
        <h2>{props.title}</h2>
        <p className="date">{props.date}</p>
        <p className="short">{props.short}</p>
        <div className="buttonsContainer">
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            endIcon={<PictureAsPdfIcon />}
            sx={{
              bgColor: '#1674B9',
              mt: 1,
              mr: 0.5
            }}
            disableElevation
            onClick={() => {
              console.log(props.pdf)
            }}
          >
            PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            endIcon={<PictureAsPdfIcon />}
            sx={{
              bgColor: '#1674B9',
              mt: 1,
              mr: 0.5
            }}
            disableElevation
            onClick={() => {
              downloadFile(props.urlPdf)
            }}
          >
            Apresentação
          </Button>
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            endIcon={<WebAssetIcon />}
            sx={{
              bgColor: '#1674B9',
              mt: 1,
              mr: 0.5
            }}
            disableElevation
            onClick={() => {
              window.open(props.urlExternal, '_blank');
            }}
          >
            Evento
          </Button>
        </div>
      </Link>
    </article >
  );
}

export default Item;