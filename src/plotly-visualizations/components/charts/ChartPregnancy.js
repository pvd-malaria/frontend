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

import data from '../../datasets/pregnancy.json';

const ChartPregnancy = React.memo(() => {
	const [play, setPlay] = useState(false);
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.year_notif).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.year_notif).reduce((a, b) => Math.max(a, b));
	const [year, setYear] = useState(minYear);

	const divId = 'chart-pregnancy';

	const states = Array.from(new Set(data.map(row => row.uf)));

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

	let frames = [];
	for(let year = minYear; year <= maxYear; year++) {
		let traces = [];
		let pregnantOptions = []; // Não/Não se aplica/Idade gestacional ignorada....

		data.forEach(item => {
			if(!pregnantOptions.includes(item.gestante)) { pregnantOptions.push(item.gestante); }
		})

		for(let pregnant of pregnantOptions) {
			let traceData = {};

			for(let state of states) {
				traceData[state] = data.filter(item => item.gestante === pregnant && item.year_notif === year && item.uf === state);

				if(traceData[state].length !== 0) { traceData[state] = traceData[state][0].perc; }
				else { traceData[state] = 0; }
			}

			let trace = {
				x: states,
				y: Object.values(traceData),
				name: pregnant,
				type: 'bar',
				hovertemplate: '%{x}' + ': %{y}',
			};

			traces.push(trace);
		}

		frames.push(traces);
	}

	let sliderMarks = [];
	for(let i = minYear; i <= maxYear; i++) {
		sliderMarks.push({
			value: i,
			label: i
		});
	}

	let maxValue = 0;
	for(let f of frames) {
		for(let trace of f) {
			let traceMax = Math.max(...trace.y);
			maxValue = Math.max(traceMax, maxValue);
		}
	}

	let frame = frames[year - minYear];

	let layout = makePlotLayout({
		xtitle: 'UF',
		ytitle: 'Proporção',
		extra: {
			'yaxis.range': [0, parseInt(maxValue * 1.15)],
			barmode: 'stack',
			'yaxis.ticksuffix': '%',
			'yaxis.hoverformat': '.2f',
			'xaxis.tickangle': 45,
			'xaxis.title.standoff': 10,
			autosize: true,
			title: 'Proporções de Casos por Idade Gestacional',
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
						saveSvgAsPng(svg, 'malaria-gestantes-' + year + '.png', {scale: 3});
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
						a.download = 'malaria-gestantes-' + year + '.svg';
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
						a.download = `malaria-gestantes-${minYear}-${maxYear}.json`;
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
						let csv = ['uf,year_notif,gestante,count,perc'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.year_notif},${row.gestante},${row.perc}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-gestantes-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	)
});

export default ChartPregnancy;