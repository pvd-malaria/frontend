import React, { useState } from 'react';
import Plot from 'react-plotly.js';

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

import { makeSvgObject, makePlotLayout } from '../../utils/utils';

import data from '../../datasets/cases-per-month.json';

const ChartCasesPerMonth = React.memo(({ hasLines }) => {
	const [play, setPlay] = useState(false);
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.year_notif).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.year_notif).reduce((a, b) => Math.max(a, b));
	const [year, setYear] = useState(minYear);

	if(!window.timeouts) window.timeouts = [];
	if(play && year < maxYear) {
		let tout = setTimeout(() => {
			setYear(year + 1)
		}, 1000)
		window.timeouts.push(tout);
	}
	else {
		for(let tout of window.timeouts) {
			clearTimeout(tout);
		}
		if(year >= maxYear && play) setPlay(false);
	}

	const months = [
		'Jan', 'Fev', 'Mar', 'Abr', 'Mai',
		'Jun', 'Jul', 'Ago', 'Set', 'Out',
		'Nov', 'Dez'
	];

	let frames = [];
	for (let year = minYear; year <= maxYear; year++) {
		let traces = [];
		let uniqueUFs = [];
		data.forEach(row => {
			if(!uniqueUFs.includes(row.uf)) {
				uniqueUFs.push(row.uf);
			}
		});
		for(let uf of uniqueUFs) {
			let traceData = {};
			for(let month of months) {
				traceData[month] = data.filter(
					row => row.uf === uf && row.year_notif === year && row.month === month
				);
				if(traceData[month].length !== 0) {
					traceData[month] = traceData[month][0].n;
				}
			}
			
			let trace = {
				x: months,
				y: Object.values(traceData),
				type: 'scatter',
				mode: (hasLines ? 'lines+' : '') + 'markers',
				name: uf,
				customdata: Object.values(traceData).map(() => uf),
				hovertemplate: '%{customdata}: %{y} casos<extra></extra>',
				connectgaps: true,
				line: { shape: 'spline' }
			};
			if(!hasLines) {
				trace.marker = {
					size: 10
				};
			}
			
			traces.push(trace);
		}
		frames.push(traces);
	};

	let sliderMarks = [];
	for(let i = minYear; i <= maxYear; i++) {
		sliderMarks.push({
			value: i,
			label: i
		});
	}

	let frame = frames[year - minYear];

	let maxValue = 0;
	for(let f of frames) {
		for(let trace of f) {
			let traceMax = Math.max(...trace.y);
			maxValue = Math.max(traceMax, maxValue);
		}
	}

	const divId = 'chart-cases-per-month' + (hasLines ? '-lines' : '');

	const layout = makePlotLayout({
		xtitle: 'Mês de notificação',
		ytitle: 'Número de casos positivos',
		extra: {
			'yaxis.range': [0, parseInt(maxValue * 1.15)],
			autosize: true,
			title: 'Casos de Malária',
			showlegend: ww > 500
		}
	});
	
	// on window resize
	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	if(ww < 768) {
		sliderMarks = sliderMarks.map(x => ({value: x.value, label: x.label.toString().slice(2, 4)}));
	}

	return (
		<>
			<div style={{width: '100%', height: 550, display: 'flex'}}>
				<Plot
					divId={divId}
					data={frame}
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
				mb: 2
			}}>
				<IconButton onClick={() => {
					if(year >= maxYear) setYear(minYear);
					if(play) {
						setPlay(false);
					}
					else {
						setPlay(true);
					}
				}} sx={{
					top: '-10px',
					mr: 2
				}}>
					{
						play ? <PauseIcon sx={{
							color: '#1674B9'
						}}/> : <PlayArrowIcon sx={{
							color: '#1674B9'
						}}/>
					}
				</IconButton>
				<Slider
					value={year}
					onChange={(e, value) => {
						if(!play) setYear(value);
					}}
					defaultValue={minYear}
					step={1}
					min={minYear}
					max={maxYear}
					marks={sliderMarks}
					sx={{
						color: '#1674B9',
						mr: 2
					}}
				/>
			</Box>
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
					startIcon={<DownloadIcon/>}
					endIcon={ww >= 500 && <ImageIcon/>}
					sx={{
						bgColor: '#1674B9',
						mt: 1,
						mr: 0.5
					}}
					disableElevation
					onClick={() => {
						let svg = makeSvgObject(divId);
						saveSvgAsPng(svg, 'malaria-cases-uf-monthly-' + year + '-' + (hasLines ? 'lines' : 'bubbles') + '.png', {scale: 3});
					}}
				>
					PNG
				</Button>

				<Button
					variant="contained"
					startIcon={<DownloadIcon/>}
					endIcon={ww >= 500 && <ImageIcon/>}
					sx={{
						bgColor: '#1674B9',
						mt: 1,
						mx: 0.5
					}}
					disableElevation
					onClick={() => {
						let svg = makeSvgObject(divId);
						let svgString = svg.outerHTML;
						let b = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = 'malaria-cases-uf-monthly-' + year + '-' + (hasLines ? 'lines' : 'bubbles') + '.svg';
						a.click();
					}}
				>
					SVG
				</Button>

				<Button
					variant="contained"
					startIcon={<DownloadIcon/>}
					endIcon={ww >= 500 && <DataObjectIcon/>}
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
						a.download = `malaria-cases-uf-monthly-${minYear}-${maxYear}.json`;
						a.click();
					}}
				>
					JSON
				</Button>

				<Button
					variant="contained"
					startIcon={<DownloadIcon/>}
					endIcon={ww >= 500 && <TableChartIcon/>}
					sx={{
						bgColor: '#1674B9',
						mt: 1,
						ml: 0.5
					}}
					disableElevation
					onClick={() => {
						let csv = ['uf,year_notif,month,n'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.year_notif},${row.month},${row.n}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-cases-uf-monthly-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartCasesPerMonth;