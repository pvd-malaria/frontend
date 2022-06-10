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

import { makeSvgObject, makePlotLayout } from '../../utils/utils';

import { saveSvgAsPng } from 'save-svg-as-png';

import data from '../../datasets/education-levels.json';

const ChartCasesPerEducationLevel = React.memo(() => {
	const [play, setPlay] = useState(false);
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.year_notif).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.year_notif).reduce((a, b) => Math.max(a, b));
	const [year, setYear] = useState(minYear);

	if (!window.timeouts) window.timeouts = [];
	if (play && year < maxYear) {
		let tout = setTimeout(() => {
			setYear(year + 1)
		}, 1000)
		window.timeouts.push(tout);
	}
	else {
		for (let tout of window.timeouts) {
			clearTimeout(tout);
		}
		if (year >= maxYear && play) setPlay(false);
	}

	const federativeUnits = Array.from(new Set(data.map(row => row.uf)));

	let frames = [];
	for (let year = minYear; year <= maxYear; year++) {
		let traces = [];
		let educationalLevels = [];
		data.forEach(row => {
			if (!educationalLevels.includes(row.escolaridade)) {
				educationalLevels.push(row.escolaridade);
			}
		});
		for (let educationalLevel of educationalLevels) {
			let traceData = {};
			for (let federativeUnit of federativeUnits) {
				traceData[federativeUnit] = data.filter(
					row => row.escolaridade === educationalLevel && row.year_notif === year && row.uf === federativeUnit
				);
				if (traceData[federativeUnit].length !== 0) {
					traceData[federativeUnit] = traceData[federativeUnit][0].perc;
				}
				else traceData[federativeUnit] = 0;
			}

			let trace = {
				x: federativeUnits,
				y: Object.values(traceData).map(v => parseFloat(v).toFixed(2)),
				type: 'bar',
				name: educationalLevel,
				hovertemplate: '%{x} ' + year + ': %{y}',
			};

			traces.push(trace);
		}
		frames.push(traces);
	};

	let sliderMarks = [];
	for (let i = minYear; i <= maxYear; i++) {
		sliderMarks.push({
			value: i,
			label: i
		});
	}

	let frame = frames[year - minYear];

	let maxValue = 0;
	for (let f of frames) {
		for (let trace of f) {
			let traceMax = Math.max(...trace.y);
			maxValue = Math.max(traceMax, maxValue);
		}
	}

	const divId = 'chart-education-level';

	const layout = makePlotLayout({
		xtitle: 'Unidade Federativa',
		ytitle: 'Porcentagem',
		extra: {
			'yaxis.range': [0, parseInt(maxValue * 1.15)],
			'yaxis.ticksuffix': '%',
			'yaxis.hoverformat': '.2f',
			'barmode': 'stack',
			autosize: true,
			title: 'Casos por Nível Educacional' + (ww <= 500 ? '<br>' : ' - ') + minYear + ' a ' + maxYear,
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
			<div style={{width: '100%', height: 400, display: 'flex'}}>
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
					if (year >= maxYear) setYear(minYear);
					if (play) {
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
						}} /> : <PlayArrowIcon sx={{
							color: '#1674B9'
						}} />
					}
				</IconButton>
				<Slider
					value={year}
					onChange={(e, value) => {
						if (!play) setYear(value);
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
						saveSvgAsPng(svg, 'malaria-cases-education-' + year + '.png', { scale: 3 });
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
						a.download = 'malaria-cases-education-' + year + '.svg';
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
						a.download = `malaria-cases-education-${minYear}-${maxYear}.json`;
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
						let csv = ['uf,year_notif,escolaridade,count,perc'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.year_notif},${row.escolaridade},${row.count},${row.perc}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-cases-education-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartCasesPerEducationLevel;