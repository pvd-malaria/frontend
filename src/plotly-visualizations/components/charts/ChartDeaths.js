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

import data from '../../datasets/deaths.json';

const ChartDeaths = React.memo(() => {
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.year_notif).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.year_notif).reduce((a, b) => Math.max(a, b));

	const years = Array.from(new Set(data.map(row => row.year_notif)));
	const uniqueUFs = Array.from(new Set(data.map(row => row.uf)));

	let traces = [];

	for(let uf of uniqueUFs) {
		let traceData = {};
		for(let i = 0; i < years.length; i++) {
			traceData[i] = data.filter(
				row => row.uf === uf && row.year_notif === years[i]
			);
			if (traceData[i].length !== 0) {
				traceData[i] = traceData[i][0].deaths;
			}
			else traceData[i] = 0;
		}

		let trace = {
			x: years,
			y: Object.values(traceData),
			type: 'scatter',
			mode: 'lines+markers',
			name: uf,
			hovertemplate: '%{x} ' + ': %{y} mortes',
			line: { shape: 'spline' },
			fill: 'tonexty',
			connectgaps: true,
		};

		traces.push(trace);
	};

	let maxValue = 0;
	for (let t of traces) {
		let traceMax = Math.max(...t.y);
		maxValue = Math.max(traceMax, maxValue);
	}

	const divId = 'chart-deaths';

	let layout = makePlotLayout({
		xtitle: 'Ano',
		ytitle: 'Número de mortes por malária',
		extra: {
			'yaxis.range': [0, parseInt(maxValue * 1.15)],
			'xaxis.dtick': 1,
			'xaxis.range': [minYear - 0.5, maxYear + 0.5],
			'xaxis.tickangle': -45,
			title: 'Número de Mortes por Malária',
			showlegend: ww > 500,
			autosize: true
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
						saveSvgAsPng(svg, `malaria-deaths-${minYear}-${maxYear}.png`, { scale: 3 });
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
						a.download = `malaria-deaths-${minYear}-${maxYear}.svg`;
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
						a.download = `malaria-deaths-${minYear}-${maxYear}.json`;
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
						let csv = ['uf,year_notif,deaths,perc,percM'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.year_notif},${row.deaths},${row.perc},${row.percM}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-deaths-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartDeaths;