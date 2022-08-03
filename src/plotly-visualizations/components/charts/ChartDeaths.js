import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import {
	Typography,
	Box,
	Button,
	Select,
	MenuItem,
	FormControl,
}
	from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import DataObjectIcon from '@mui/icons-material/DataObject';
import TableChartIcon from '@mui/icons-material/TableChart';

import { saveSvgAsPng } from 'save-svg-as-png';
import { makeSvgObject, makePlotLayout, ColorWay } from '../../utils/utils';

import data from '../../datasets/deaths.json';

const hex2rgb = hex => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const ChartDeaths = React.memo(() => {
	const [ww, setWw] = useState(null);
	const [relative, setRelative] = useState(false);

	if(ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.year_notif).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.year_notif).reduce((a, b) => Math.max(a, b));

	const years = Array.from(new Set(data.map(row => row.year_notif)));
	const uniqueUFs = Array.from(new Set(data.map(row => row.uf)));

	let colorWay = [...ColorWay];
	colorWay = colorWay.reverse();

	let traces = [];

	for(let uf of uniqueUFs) {
		let traceData = {};

		for(let i = 0; i < years.length; i++) {
			traceData[i] = data.filter(
				row => row.uf === uf && row.year_notif === years[i]
			);
			if (traceData[i].length !== 0) {
				if(relative) {
					traceData[i] = traceData[i][0].percM;
				}
				else {
					traceData[i] = traceData[i][0].deaths;
				}
			}
			else traceData[i] = 0;
		}

		let trace = {
			x: years,
			y: Object.values(traceData),
			type: 'scatter',
			mode: 'lines+markers',
			name: uf,
			line: { shape: 'spline' },
			fill: 'tonexty',
			connectgaps: true,
			stackgroup: 'one'
		};

		if(relative) {
			trace.hovertemplate = '%{x}' + ': %{y}%';
		}
		else {
			trace.hovertemplate = '%{x}' + ': %{y} mortes';
		}

		traces.push(trace);
	};

	let maxSum = 0;
	if(relative) {
		maxSum = 100;
	}
	else {
		for(let year of years) {
			let sum = 0;
			for(let t of traces) {
				sum += t.y[year - minYear];
			}
			maxSum = Math.max(sum, maxSum);
		}
	}

	const divId = 'chart-deaths';

	let layout = makePlotLayout({
		xtitle: 'Ano',
		ytitle: 'Número de mortes por malária',
		colorway: colorWay,
		extra: {
			'yaxis.range': [0, parseInt(maxSum * 1.05)],
			'xaxis.dtick': 1,
			'xaxis.range': [minYear - 0.25, maxYear + 0.25],
			'xaxis.tickangle': -45,
			title: 'Número de Mortes por Malária',
			showlegend: ww > 500,
			autosize: true,
			transition: null
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
			<Box sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				mb: 1
			}}>
				<FormControl size="small">
					<Select
						value={relative}
						onChange={e => setRelative(e.target.value)}
					>
						<MenuItem value={false}>Absoluto</MenuItem>
						<MenuItem value={true}>Relativo</MenuItem>
					</Select>
				</FormControl>
			</Box>
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