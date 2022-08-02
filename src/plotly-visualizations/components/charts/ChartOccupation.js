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

import { makePlotLayout, ColorWay, makeSvgObject } from '../../utils/utils';

import data from '../../datasets/occupation.json';

const ChartOccupation = React.memo(() => {
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

	const occupations = Array.from(new Set(data.map(row => row.ocup)));
	const uniqueUFs = Array.from(new Set(data.map(row => row.uf)));
	const siglas = {
		'Acre': 'AC',
		'Amazonas': 'AM',
		'Amapá': 'AP',
		'Rondônia': 'RO',
		'Roraima': 'RR',
		'Pará': 'PA',
		'Mato Grosso': 'MT',
		'Tocantins': 'TO',
		'Maranhão': 'MA'
	};

	const UFAnno = {
		'Acre': [2, 1],
		'Amazonas': [3, 1],
		'Amapá': [3, 2],
		'Rondônia': [1, 1],
		'Roraima': [1, 2],
		'Pará': [2, 2],
		'Mato Grosso': [3, 3],
		'Tocantins': [1, 3],
		'Maranhão': [2, 3]
	};

	let UFHasDataInYear = {};
	for(let uf of uniqueUFs) {
		UFHasDataInYear[uf] = {};
		for(let y = minYear; y <= maxYear; y++) {
			UFHasDataInYear[uf][y] = false;
		}
	}

	let colorMap = {};
    for(let i = occupations.length - 1; i >= 0; i--) {
        colorMap[occupations[occupations.length - i]] = ColorWay[i];
    }

	let rowNum = 0;
	let colNum = 0;
	let frames = [];
	for (let year = minYear; year <= maxYear; year++) {
		rowNum = 0;
		colNum = 0;
		let frame = [];
		for(let uf of uniqueUFs) {
			let traceData = {};
			for(let ocup of occupations) {
				traceData[ocup] = data.filter(
					row => row.uf === uf && row.year_notif === year && row.ocup === ocup
				);
				if(traceData[ocup].length !== 0 && traceData[ocup]) {
					traceData[ocup] = traceData[ocup][0].count;
					UFHasDataInYear[uf][year] = true;
				}
				else {
					traceData[ocup] = 0;
				}
			}

			// tricky hack to annotate over these invisible charts
			// (text inside donut)
			frame.push({
				x: [],
				y: [],
				type: 'violin',
				hoverinfo: 'none',
				xaxis: 'x' + (colNum + 1),
				yaxis: 'y' + (rowNum + 1),
				showlegend: false
			});

			frame.push({
				values: Object.values(traceData),
				labels: occupations,
				textposition: 'inside',
				name: uf,
				hoverinfo: 'label+percent',
				hole: .5,
				type: 'pie',
				domain: {
					row: rowNum,
					column: colNum,
				},
				marker: {
					colors: occupations.map(ocup => colorMap[ocup])
				},
			});

			colNum++;
			if(colNum > 2) {
				colNum = 0;
				rowNum++;
			}
		}
		frames.push(frame);
	};

	let sliderMarks = [];
	for(let i = minYear; i <= maxYear; i++) {
		sliderMarks.push({
			value: i,
			label: i
		});
	}

	// on window resize
	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	if(ww < 768) {
		sliderMarks = sliderMarks.map(x => ({value: x.value, label: x.label.toString().slice(2, 4)}));
	}

	let frame = frames[year - minYear];

	const divId = 'chart-occupation';

	let anno = [];

	for(let uf of uniqueUFs) {
		if(!UFHasDataInYear[uf][year]) continue;
		let xr = 'x' + (UFAnno[uf][0] === 1 ? '' : UFAnno[uf][0]) + ' domain';
		let yr = 'y' + (UFAnno[uf][1] === 1 ? '' : UFAnno[uf][1]) + ' domain';
		let a = {
			x: 0.5,
			y: 0.5,
			xref: xr,
			yref: yr,
			text: '<b>' + siglas[uf] + '</b>',
			showarrow: false,
			font: {
				size: ww <= 500 ? 12 : 20,
				color: '#333',
				family: '\'Roboto\', Arial, Helvetica, sans-serif',
			}
		};
		anno.push(a);
	}

	let layoutExtra = {
		grid: { rows: 3, columns: 3 },
		'legend.orientation': 'h',
		showlegend: ww > 500,
		autosize: true,
		title: 'Proporções de Casos por Ocupação',
		annotations: anno
	};

	for(let i = 1; i <= 3; i++) {
		let xax = 'xaxis' + (i === 1 ? '' : i);
		let yax = 'yaxis' + (i === 1 ? '' : i);
		layoutExtra[xax + '.visible'] = false;
		layoutExtra[yax + '.visible'] = false;
		layoutExtra[xax + '.fixedrange'] = true;
		layoutExtra[yax + '.fixedrange'] = true;
	}

	let layout = makePlotLayout({
		extra: layoutExtra,
		xtitle: 'Ocupação'
	});

	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	return (
		<>
			<div style={{width: '100%', height: 700, display: 'flex'}}>
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
						//let svg = makeSvgObject(divId);
						//saveSvgAsPng(svg, 'malaria-occupations-' + year + '.png', {scale: 1, encoderOptions: 0.75});
						Plotly.downloadImage(divId, {
							format: 'png',
							filename: 'malaria-occupations-' + year
						});
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
						a.download = 'malaria-occupations-' + year + '.svg';
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
						a.download = `malaria-occupations-${minYear}-${maxYear}.json`;
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
						let csv = ['uf,year_notif,ocup,count'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.year_notif},${row.ocup},${row.count}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-occupations-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartOccupation;