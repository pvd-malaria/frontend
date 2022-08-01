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
import { makeSvgObject, makePlotLayout, ColorWay } from '../../utils/utils';

import data from '../../datasets/incidence.json';

const ChartIncidenceRate = React.memo(() => {
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.year_notif).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.year_notif).reduce((a, b) => Math.max(a, b));

	const years = Array.from(new Set(data.map(row => row.year_notif)));
	const uniqueUFs = Array.from(new Set(data.map(row => row.uf)));

	// tradeoff: memory x time
	let munData = {};
	let ufMun = {};
	for(let row of data) {
		if (!munData[row.municipio]) {
			munData[row.municipio] = {};
		}
		munData[row.municipio][row.year_notif] = row.txinc;
		if (!ufMun[row.uf]) {
			ufMun[row.uf] = [];
		}
		if (!ufMun[row.uf].includes(row.municipio)) {
			ufMun[row.uf].push(row.municipio);
		}
	}
	
	let traces = [];

	for(let uf_i = 0; uf_i < uniqueUFs.length; uf_i++) {
		let uf = uniqueUFs[uf_i];
		let xax = [];
		let yax = [];
		let texts = [];
		for(let year of years) {
			for(let municipio of ufMun[uf]) {
				let k = munData[municipio];
				xax.push(year);
				if(k.length === 0) {
					yax.push(0);
				}
				else {
					k = k[year];
					if(k == null) k = 0;
					else yax.push(k);
				}
				texts.push(municipio);
			}
		}

		let trace = {
			x: xax,
			y: yax,
			type: 'scatter',
			mode: 'markers',
			name: uf,
			text: texts,
			marker: {
				size: 10,
				opacity: 0.85,
			},
			color: ColorWay[uf_i],
			hovertemplate: '%{text} (%{x}): %{y:.2f} p.m.<extra></extra>',
		};

		traces.push(trace);
	};
	
	let maxValue = 0;
	for (let t of traces) {
		let traceMax = Math.max(...t.y);
		maxValue = Math.max(traceMax, maxValue);
	}

	const divId = 'chart-rates';

	let layout = makePlotLayout({
		xtitle: 'Ano',
		ytitle: 'Taxa de Incidência' + (ww <= 500 ? '<br>' : ' ') + 'por mil habitantes',
		extra: {
			'yaxis.range': [0, parseInt(maxValue * 1.15)],
			'xaxis.dtick': 1,
			'xaxis.range': [minYear - 0.5, maxYear + 0.5],
			'xaxis.tickangle': -45,
			title: 'Taxa de Incidência de Malária',
			autosize: true,
			showlegend: ww > 500
		},
	});

	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	return (
		<>
			<div style={{width: '100%', height: 550, display: 'flex'}}>
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
					onClick={() => {
						let svg = makeSvgObject(divId);
						saveSvgAsPng(svg, `incidence-rate-${minYear}-${maxYear}.png`, { scale: 3 });
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
						a.download = `incidence-rate-${minYear}-${maxYear}.svg`;
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
						a.download = `incidence-rate-${minYear}-${maxYear}.json`;
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
						let csv = ['uf,MUN_INFE,municipio,year_notif,Pop,count,txinc'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.MUN_INFE},${row.municipio},${row.year_notif},${row.Pop},${row.count},${row.txinc}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `incidence-rate-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartIncidenceRate;