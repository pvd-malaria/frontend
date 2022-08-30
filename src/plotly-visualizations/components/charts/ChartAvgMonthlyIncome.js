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

import data from '../../datasets/income.json';

const ChartAvgMonthlyIncome = React.memo(() => {
	const [ww, setWw] = useState(null);

	if (ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.ano).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.ano).reduce((a, b) => Math.max(a, b));

	const [focused, setFocused] = useState(null);

	const years = Array.from(new Set(data.map(row => row.ano)));
	const uniqueUFs = [
		'Brasil', 'Rondônia', 'Acre', 'Amazonas',
		'Roraima', 'Pará', 'Amapá', 'Tocantins',
		'Maranhão', 'Mato Grosso'
	]; // Amazônia legal, desconsidere: // Array.from(new Set(data.map(row => row.uf_n)));

	let traces = [];

	for (let uf of uniqueUFs) {
		let traceData = {};
		for (let i = 0; i < years.length; i++) {
			traceData[i] = data.filter(
				row => row.uf_n === uf && row.ano === years[i]
			);
			if (traceData[i].length !== 0) {
				traceData[i] = traceData[i][0].renda;
			}
			else traceData[i] = 0;
		}

		let trace = {
			x: years,
			y: Object.values(traceData),
			type: 'scatter',
			mode: 'lines+markers',
			name: uf,
			hovertemplate: uf + '<br>Ano: %{x}<br>Renda: %{y}<extra></extra>',
			line: { shape: 'spline' },
			connectgaps: true
		};

		if (focused != null) {
			if (focused === uf) {
				trace.opacity = 1;
			}
			else {
				trace.opacity = 0.25;
			}
		}

		traces.push(trace);
	};

	let maxValue = 0;
	for (let t of traces) {
		let traceMax = Math.max(...t.y);
		maxValue = Math.max(traceMax, maxValue);
	}

	const divId = 'chart-avg-monthly-income';

	let layout = makePlotLayout({
		xtitle: 'Ano',
		ytitle: 'Renda média per capita',
		extra: {
			'yaxis.range': [0, parseInt(maxValue * 1.15)],
			'xaxis.dtick': 1,
			'yaxis.tickprefix': 'R$ ',
			'xaxis.range': [minYear - 0.5, maxYear + 0.5],
			'xaxis.tickangle': -45,
			'xaxis.fixedrange': true,
			'yaxis.fixedrange': true,
			transition: null,
			title:
				'Rendimento médio mensal' +
				(ww <= 500 ? '<br>' : ' - ') +
				minYear + ' a ' + maxYear,
			showlegend: ww > 500,
			hovermode: 'closest'
		}
	});

	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	return (
		<>
			<div style={{ width: '100%', height: 400, display: 'flex' }}>
				<Plot
					divId={divId}
					data={traces}
					layout={layout}
					config={{ responsive: true }}
					useResizeHandler={true}
					style={{ width: '100%', height: '100%' }}
					onHover={e => {
						setFocused(e.points[0].data.name);
					}}
					onUnhover={() => {
						setFocused(null);
					}}
				/>
			</div>
			{/* <center>
				<Typography variant="caption">
					Fonte: Sistema de Informação de Mortalidade (SIM) - Datasus
				</Typography>
			</center> */}
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
						saveSvgAsPng(svg, `malaria-avg-monthly-income-${minYear}-${maxYear}.png`, { scale: 3 });
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
						a.download = `malaria-avg-monthly-income-${minYear}-${maxYear}.svg`;
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
						a.download = `malaria-avg-monthly-income${minYear}-${maxYear}.json`;
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
						let csv = ['uf,uf_n,ano,renda'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.uf_n},${row.ano},${row.renda}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-avg-monthly-income-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartAvgMonthlyIncome;