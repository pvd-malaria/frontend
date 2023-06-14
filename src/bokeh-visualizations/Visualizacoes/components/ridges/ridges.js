import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import canvg from 'canvg';

import data from '../../Pipenv/proportions.json'; //ALTERAR O DOMINIO NA url DENTRO DO JSON QUANDO O PROJETO MUDAR DE INFRAESTRUTURA

// import proportion from './proportion.html'

import {
	Typography,
	Slider,
	Box,
	IconButton,
	Button,
}
	from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import DataObjectIcon from '@mui/icons-material/DataObject';
import TableChartIcon from '@mui/icons-material/TableChart';

import { saveSvgAsPng } from 'save-svg-as-png';

import { makeSvgObject, makePlotLayout } from '../../../utils/utils';


const VisRidges = () => {
	console.log("ridges");
	const [ww, setWw] = useState(null);
	const [relative, setRelative] = useState(false);

	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	const divId = 'ridge-proportions';

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<iframe
					id={divId}
					title="Proporção de Casos Positivos"
					src='proportion.html'
					width="100%"
					height={900}
					frameBorder="0"
					scrolling="no"
					sandbox="allow-forms allow-scripts allow-downloads allow-same-origin allow-forms"
				>
				</iframe>
			</div>
			<center>
				<Typography variant="caption">
					Fonte: Sistema de Informações de Vigilância Epidemiológica (SIVEP) - Malária
				</Typography>
			</center>
			<Box sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				mt: 1
			}}>
				<Button
					variant="contained"
					startIcon={<DownloadIcon />}
					endIcon={ww >= 500 && <ImageIcon />}
					sx={{
						bgColor: '#1674B9',
						mt: 1,
						mr: 0.5
					}}
					disableElevation
					onClick={async () => {
						console.log(document.getElementById(divId))

						const iframe = document.getElementById(divId);
						console.log(iframe)
						const iframeContent = iframe.contentDocument.documentElement;

						html2canvas(iframeContent).then((canvas) => {
							canvas.toBlob((blob) => {
								saveAs(blob, 'proportions-ridge.png');
							});
						});

					}}
				>
					PNG
				</Button>

				<Button
					variant="contained"
					startIcon={<DownloadIcon />}
					endIcon={ww >= 500 && <DataObjectIcon />}
					sx={{
						bgColor: '#1674B9',
						mt: 1,
						mx: 0.5
					}}
					disableElevation
				onClick={() => {
					let b = new Blob([JSON.stringify(data)]);
					let url = window.URL.createObjectURL(b);
					let a = document.createElement('a');
					a.href = url;
					a.download = `proportion.json`;
					a.click();
				}}
				>
					JSON
				</Button>

				<Button
					variant="contained"
					startIcon={<DownloadIcon />}
					endIcon={ww >= 500 && <TableChartIcon />}
					sx={{
						bgColor: '#1674B9',
						mt: 1,
						ml: 0.5
					}}
					disableElevation
				onClick={() => {
					let csv = ['uf,year,total,positivo,prop_positive_total'];
					data.forEach(row => {
						csv.push(`${row.uf},${row.year},${row.total},${row.positivo},${row.prop_positive_total}`);
					});
					csv = csv.join('\n');
					let b = new Blob([csv]);
					let url = window.URL.createObjectURL(b);
					let a = document.createElement('a');
					a.href = url;
					a.download = `proportion.csv`;
					a.click();
				}}
				>
					CSV
				</Button>
			</Box>
		</div >
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisRidges />);