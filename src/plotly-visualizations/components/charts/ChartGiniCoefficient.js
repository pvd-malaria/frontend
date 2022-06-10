import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import {
	Typography,
	Box,
	Button,
}
from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import DataObjectIcon from '@mui/icons-material/DataObject';
import TableChartIcon from '@mui/icons-material/TableChart';

import { saveSvgAsPng } from 'save-svg-as-png';
import { makeSvgObject, makePlotLayout } from '../../utils/utils';

import data from '../../datasets/gini.json';

const ChartGiniCoefficient = React.memo(() => {
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	const years = Array.from(new Set(data.map(row => row.ano)));
	const uniqueUFs = [
		'Brasil', 'Rondônia', 'Acre', 'Amazonas',
		'Roraima', 'Pará', 'Amapá', 'Tocantins',
		'Maranhão', 'Mato Grosso'
	]; // Amazônia legal, desconsidere: // Array.from(new Set(data.map(row => row.uf_n)));

	let ufYearGini = {};
	for(let uf of uniqueUFs) {
		ufYearGini[uf] = {};
		for(let y of years) {
			ufYearGini[uf][y] = data.filter(
				row => row.uf_n === uf && row.ano === y
			)[0].gini;
			if(isNaN(ufYearGini[uf][y])) ufYearGini[uf][y] = null;
		}
	}

	let minYear = 9999;
	let maxYear = -1;
	for(let y of years) {
		let approved = true;
		for(let uf of uniqueUFs) {
			if(ufYearGini[uf][y] == null) {
				approved = false;
				break;
			}
		}
		if(approved) minYear = Math.min(minYear, y);
	}
	for(let y of years.reverse()) {
		let approved = true;
		for(let uf of uniqueUFs) {
			if(ufYearGini[uf][y] == null) {
				approved = false;
				break;
			}
		}
		if(approved) maxYear = Math.max(maxYear, y);
	}

	let traces = [];
	for(let uf of uniqueUFs) {
		let xax = [];
		let yax = [];
		for(let y = minYear; y <= maxYear; y++) {
			xax.push(y);
			if(uf in ufYearGini && y in ufYearGini[uf]) {
				yax.push(ufYearGini[uf][y]);
			} else {
				yax.push(null);
			}
		}

		let trace = {
			x: xax,
			y: yax,
			type: 'scatter',
			mode: 'lines+markers',
			name: uf,
			hovertemplate: 'Ano: %{x}'+'<br>'+'Valor: %{y}'+'<br>'+'Território: ' + uf,
			//line: { shape: 'spline' },
			//fill: 'tozeroy',
			connectgaps: true
		};

		traces.push(trace);
	};

	let maxValue = 0;
	for (let t of traces) {
		let traceMax = Math.max(...t.y);
		maxValue = Math.max(traceMax, maxValue);
	}

	const divId = 'chart-gini-coefficient';

	let layout = makePlotLayout({
		xtitle: 'Ano',
		ytitle: 'Índice',
		extra: {
			'xaxis.range': [minYear - 0.5, maxYear + 0.5],
			'xaxis.dtick': 1,
			'xaxis.tickangle': -45,
			'yaxis.hoverformat': '.2f',
			title:
				'Índice de Gini' +
				(ww <= 500 ? '<br>' : ' ') +
				'(menor é melhor)' +
				(ww <= 500 ? '<br>' : ' - ') +
				minYear + ' a ' + maxYear,
			legend: {
				y: 0.5,
				x: 0.94
			},
			showlegend: ww > 500
		}
	});

	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	return (
		<>
			<div style={{width: '100%', height: 400, display: 'flex'}}>
				<Plot
					divId={divId}
					data={traces}
					layout={layout}
					config={{responsive: true}}
					useResizeHandler={true}
					style={{width: '100%', height: '100%'}}
				/>
			</div>
			<center>
				<Typography variant="caption">
					Fonte: Sistema de Informação de Mortalidade (SIM) - Datasus
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
					onClick={() => {
						let svg = makeSvgObject(divId);
						saveSvgAsPng(svg, `malaria-gini-coefficient-${minYear}-${maxYear}.png`, { scale: 3 });
					}}
				>
					PNG
				</Button>

				<Button
					variant="contained"
					startIcon={<DownloadIcon />}
					endIcon={ww >= 500 && <ImageIcon />}
					sx={{
						bgColor: '#1674B9',
						mt: 1,
						mx: 0.5
					}}
					disableElevation
					onClick={() => {
						let svg = makeSvgObject(divId);
						let svgString = svg.outerHTML;
						let b = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-gini-coefficient-${minYear}-${maxYear}.svg`;
						a.click();
					}}
				>
					SVG
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
						a.download = `malaria-gini-coefficient${minYear}-${maxYear}.json`;
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
						let csv = ['uf,uf_n,ano,gini'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.uf_n},${row.ano},${row.gini}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-gini-coefficient-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartGiniCoefficient;