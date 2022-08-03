import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import {
	Typography,
	Box,
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

import { makeSvgObject, makePlotLayout, ColorWay } from '../../utils/utils';

import data from '../../datasets/education-groups.json';

const ChartEducationGroups = React.memo(() => {
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	let minYear = data.map(row => row.year).reduce((a, b) => Math.min(a, b));
	let maxYear = data.map(row => row.year).reduce((a, b) => Math.max(a, b));

	let years = [];
	for (let year = minYear; year <= maxYear; year++) years.push(year);

	let traces = [];
	let colNum = 1;
	let rowNum = 1;

	const UFs = Array.from(new Set(data.map(row => row.uf)));
	const Groups = Array.from(new Set(data.map(row => row.aes))).reverse();
	let GroupColors = {}
	for(let i = 0; i < Groups.length; i++) {
		GroupColors[Groups[i]] = ColorWay[i];
	}

	years = years.filter(y => y !== 2010);

	for(let uf of UFs) {
		for(let group of Groups) {
			let percentages = [];
			let texts = [];
			for(let year of years) {
				let row = data.filter(r => r.uf == uf && r.year == year && r.aes == group);
				if(row.length) row = row[0];
				else row = { perc: 0 };
				percentages.push(row.perc);
				texts.push(uf);
			}
	
			let trace = {
				type: 'scatter',
				mode: 'lines',
				x: years,
				y: percentages,
				stackgroup: 'one',
				name: group,
				legendgroup: group,
				showlegend: rowNum === 1 && colNum === 1,
				line: {
					width: 1,
					color: GroupColors[group],
				},
				fillcolor: GroupColors[group],
				hoveron: 'points+fills',
				fill: 'tonexty',
				text: texts,
				customdata: percentages.map(x => x * 100),
				hovertemplate: '%{text} %{x}: %{customdata:.2f}%',
				xaxis: 'x' + colNum,
				yaxis: 'y' + rowNum,
			};
	
			traces.push(trace);
		}
		colNum++;
		if(colNum > 2) {
			colNum = 1;
			rowNum++;
		}
	}

	const divId = 'chart-education-groups';

	let layoutExtra = {
		grid: {
			rows: rowNum - 1, columns: 2
		},
		'legend.orientation': 'h',
		autosize: true,
		title: 'Proporções de Casos por Anos de Estudo',
		showlegend: ww > 500,
	};


	layoutExtra['yaxis3.title.text'] = 'Porcentagem de casos';
	for(let i = 1; i <= rowNum + 1; i++) {
		layoutExtra['yaxis' + (i === 1 ? '' : i) + '.tickformat'] = '.0%';
		layoutExtra['yaxis' + (i === 1 ? '' : i) + '.tickmode'] = 'linear';
		layoutExtra['yaxis' + (i === 1 ? '' : i) + '.dtick'] = 0.25;
	}
	for(let i = 1; i <= colNum + 1; i++) {
		layoutExtra['xaxis' + (i === 1 ? '' : i) + '.tickmode'] = 'linear';
		layoutExtra['xaxis' + (i === 1 ? '' : i) + '.tickangle'] = -45;
		if(ww <= 500) {
			let ticks = [];
			for(let t = minYear; t <= maxYear; t += 5) ticks.push(t);
			ticks.push(maxYear);
			layoutExtra['xaxis' + (i === 1 ? '' : i) + '.tickmode'] = 'array';
			layoutExtra['xaxis' + (i === 1 ? '' : i) + '.tickvals'] = ticks;
			layoutExtra['xaxis' + (i === 1 ? '' : i) + '.tickangle'] = -90;
		}
	}

	let layout = makePlotLayout({
		minYear: minYear,
		maxYear: maxYear,
		extra: layoutExtra
	});

	// on window resize
	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	return (
		<>
			<div style={{width: '100%', height: 2000, display: 'flex'}}>
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
						saveSvgAsPng(svg, 'malaria-education-groups-' + year + '.png', {scale: 3});
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
						a.download = 'malaria-education-groups.svg';
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
						a.download = `malaria-education-groups-${minYear}-${maxYear}.json`;
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
						let csv = ['uf,year,aes,n,perc'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.year},${row.aes},${row.n},${row.perc}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-education-groups-${minYear}-${maxYear}.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartEducationGroups;