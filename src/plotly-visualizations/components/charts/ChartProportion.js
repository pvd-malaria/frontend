import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import {
	Typography,
	Box,
	Button
}
from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import DataObjectIcon from '@mui/icons-material/DataObject';
import TableChartIcon from '@mui/icons-material/TableChart';

import { saveSvgAsPng } from 'save-svg-as-png';
import { makePlotLayout, ColorWay, makeSvgObject } from '../../utils/utils';

const DATASET_URL = 'https://gist.githubusercontent.com/lucasrdrgs/44bb6fac9094916d14708a037d4f5699/raw/3431b230b810ae47fdbb33cb404a0fb7008591d5/proportions.json';

const ChartProportion = React.memo(() => {
	const [data, setData] = useState(null);

	const [minYear, setMinYear] = useState(null);
	const [maxYear, setMaxYear] = useState(null);

	if(!data) {
		fetch(DATASET_URL)
		.then(r => r.json())
		.then(j => {
			setData(j);
			let mn_y = j.map(row => row.year).reduce((a, b) => Math.min(a, b));
			let mx_y = j.map(row => row.year).reduce((a, b) => Math.max(a, b));
			setMinYear(mn_y);
			setMaxYear(mx_y);
		});
		return <Typography variant="body1">Carregando dados da visualização...</Typography>;
	}

	const uniqueUFs = Array.from(new Set(data.map(row => row.uf)));
	const siglas = {
		'AC': 'Acre',
		'AM': 'Amazonas',
		'AP': 'Amapá',
		'RO': 'Rondônia',
		'RR': 'Roraima',
		'PA': 'Pará',
		'MT': 'Mato Grosso',
		'TO': 'Tocantins',
		'MA': 'Maranhão'
	};

	let colorMap = {};
	for(let i = 0; i < uniqueUFs.length; i++) {
		colorMap[uniqueUFs[i]] = ColorWay[i];
	}

	let years = [];
	for(let y = minYear; y <= maxYear; y++) years.push(y);

	let maxVal = 0;

	let traces = [];
	for (let i = 0; i < uniqueUFs.length; i++) {
		let uf = uniqueUFs[i];
		let props = data.filter(row => row.uf === uf);
		let vals = [];
		for(let y of years) {
			let x = props.filter(row => row.year === y);
			if(!x || !x.length) vals.push(null);
			else vals.push(x[0].prop_positive_total);
		}
		maxVal = Math.max(maxVal, Math.max(...vals));
		let trace = {
			type: 'scatter',
			name: siglas[uf],
			x: years,
			y: vals,
			xaxis: 'x' + (i + 1),
			yaxis: 'y' + (i + 1),
			fill: 'tozeroy'
		};
		traces.push(trace);
	};

	const divId = 'chart-proportion';

	let layout = {
		title: 'Proporção de casos positivos por casos investigados',
		minYear: minYear,
		maxYear: maxYear,
		extra: {
			height: 800,
			'legend.orientation': 'h',
			grid: {rows: uniqueUFs.length, columns: 1}
		}
	};

	for(let i = 0; i < uniqueUFs.length; i++) {
		let xax = 'xaxis' + (i > 0 ? i + 1 : '');
		layout.extra[xax + '.zeroline'] = false;
		layout.extra[xax + '.showgrid'] = false;
		layout.extra[xax + '.dtick'] = 1;
		layout.extra[xax + '.range'] = [minYear - 0.5, maxYear + 0.5];
		layout.extra[xax + '.tickvals'] = [];
	}
	layout.extra['xaxis' + (uniqueUFs.length) + '.tickangle'] = -45;
	layout.extra['xaxis' + (uniqueUFs.length) + '.tickvals'] = years;
	layout.extra['xaxis' + (uniqueUFs.length) + '.title.text'] = 'Proporção ao longo dos anos';

	let domains = [];
	for(let i = 0; i < uniqueUFs.length; i++) {
		domains.push([i / uniqueUFs.length, (i + 1) / uniqueUFs.length]);
	}
	const domainGap = 0.02;
	for(let i = 0; i < uniqueUFs.length; i++) {
		if(i != 0)
			domains[i][0] += domainGap * (i == uniqueUFs.length - 1 ? 2 : 1);
		if(i != uniqueUFs.length - 1)
			domains[i][1] -= domainGap * (i == 0 ? 2 : 1);
	}

	for(let i = 0; i < uniqueUFs.length; i++) {
		let yax = 'yaxis' + (i > 0 ? i + 1 : '');
		layout.extra[yax + '.zeroline'] = false;
		layout.extra[yax + '.showgrid'] = false;
		layout.extra[yax + '.range'] = [0, parseInt(maxVal * 1.15)];
		layout.extra[yax + '.title.text'] = uniqueUFs[i];
		layout.extra[yax + '.domain'] = domains[i];
	}

	layout = makePlotLayout(layout);

	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	return (
		<>
			<Box sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column'
			}}>
				<Plot
					divId={divId}
					data={traces}
					layout={layout}
				/>
				<Typography variant="caption">
					Fonte: Sistema de Informações de Vigilância Epidemiológica (SIVEP) - Malária
				</Typography>
				<Box sx={{
					width: '70%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mt: 1,
					mb: 3
				}}>
					<Button
						variant="contained"
						startIcon={<DownloadIcon/>}
						endIcon={<ImageIcon/>}
						sx={{
							bgColor: '#1674B9',
							mt: 1,
							mr: 0.5
						}}
						disableElevation
						onClick={() => {
							let svg = makeSvgObject(divId);
							saveSvgAsPng(svg, 'malaria-proportions-' + year + '.png', {scale: 3});
						}}
					>
						PNG
					</Button>

					<Button
						variant="contained"
						startIcon={<DownloadIcon/>}
						endIcon={<ImageIcon/>}
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
							a.download = 'malaria-proportions-' + year + '.svg';
							a.click();
						}}
					>
						SVG
					</Button>

					<Button
						variant="contained"
						startIcon={<DownloadIcon/>}
						endIcon={<DataObjectIcon/>}
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
							a.download = `malaria-proportions-${minYear}-${maxYear}.json`;
							a.click();
						}}
					>
						JSON
					</Button>

					<Button
						variant="contained"
						startIcon={<DownloadIcon/>}
						endIcon={<TableChartIcon/>}
						sx={{
							bgColor: '#1674B9',
							mt: 1,
							ml: 0.5
						}}
						disableElevation
						onClick={() => {
							let csv = ['uf,year,total,positivo,prop_positive_total'];
							data.forEach(row => {
								csv.push(`${row.uf},${row.year_notif},${row.ocup},${row.count}`);
							});
							csv = csv.join('\n');
							let b = new Blob([csv]);
							let url = window.URL.createObjectURL(b);
							let a = document.createElement('a');
							a.href = url;
							a.download = `malaria-proportions-${minYear}-${maxYear}.csv`;
							a.click();
						}}
					>
						CSV
					</Button>
				</Box>
			</Box>
		</>
	);
});

export default ChartProportion;