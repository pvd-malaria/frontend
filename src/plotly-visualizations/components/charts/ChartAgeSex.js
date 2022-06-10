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

import data from '../../datasets/pyramid-age-sex.json';

const ChartAgeSex = React.memo(() => {
	const [ww, setWw] = useState(null);

	if(ww === null) setWw(window.innerWidth);

	let ageRanges = Array.from(new Set(data.map(row => row.age_range)));
	ageRanges.sort((a, b) => {
		let A = parseInt(a.split(' ')[0]);
		let B = parseInt(b.split(' ')[0]);
		return A - B;
	});
	const uniqueUFs = [
		'Rondônia', 'Acre', 'Amazonas',
		'Roraima', 'Pará', 'Amapá', 'Tocantins',
		'Maranhão', 'Mato Grosso'
	]; // Amazônia legal, desconsidere: // Array.from(new Set(data.map(row => row.uf)));

	let traces = [];
	let sexes = {'-1': 'Masculino', 1: 'Feminino'}
	let col_n = 0;
	let row_n = 0;
	for(let uf of uniqueUFs) {
		// Brasil
		for(let sex_i of [-1, 1]) {
			let sex = sexes[sex_i];
			let xax = [];
			let yax = [];
			for(let rng of ageRanges) {
				let row = data.find(row => row.uf_n === 'Brasil' && row.sex === sex && row.age_range === rng);
				if (row) {
					yax.push(rng);
					xax.push(row.p);
				}
			}
			// remove trace from hover
			let trace = {
				x: xax,
				y: yax,
				type: 'bar',
				name: 'Brasil',
				orientation: 'h',
				hoverinfo: 'skip',
				marker: { color: '#AAA' },
				opacity: 0.8,
				xaxis: 'x' + (col_n + 1),
				yaxis: 'y' + (row_n + 1),
				showlegend: (col_n === 0 && row_n === 0 && sex_i === -1)
			};

			traces.push(trace);
		}

		for(let sex_i of [-1, 1]) {
			let sex = sexes[sex_i];
			let xax = [];
			let yax = [];
			let c_data = [];
			for(let rng of ageRanges) {
				let row = data.find(row => row.uf_n === uf && row.sex === sex && row.age_range === rng);
				if (row) {
					yax.push(rng);
					xax.push(row.p);
					c_data.push(row.n);
				}
			}
			let trace = {
				x: xax,
				y: yax,
				customdata: c_data,
				hovertemplate: sexes[sex_i] + ': %{customdata}<extra></extra>',
				type: 'bar',
				name: sex,
				orientation: 'h',
				marker: { color: ColorWay[sex_i === -1 ? 4 : 1] },
				opacity: 0.75,
				xaxis: 'x' + (col_n + 1),
				yaxis: 'y' + (row_n + 1),
				showlegend: (col_n === 0 && row_n === 0)
			};

			traces.push(trace);
		}

		col_n++;
		if(col_n > 2) {
			col_n = 0;
			row_n++;
		}
	}

	const divId = 'chart-deaths';

	let layoutExtra = {
		title: 'Estrutura etária' + (ww <= 500 ? '<br>' : ' ') + 'e por sexo',
		barmode: 'overlay',
		bargap: 0.1,
		hovermode: 'y unified',
		grid: { rows: 3, columns: 3 },
		autosize: true,
		showlegend: ww > 500,
		annotations: []
	};

	for(let i = 1; i <= 3; i++) {
		let yax = 'yaxis' + (i === 1 ? '' : i);
		let xax = 'xaxis' + (i === 1 ? '' : i);

		layoutExtra[xax + '.zeroline'] = false;
		layoutExtra[yax + '.showgrid'] = true;
		layoutExtra[yax + '.gridcolor'] = '#DDD';
		layoutExtra[yax + '.zeroline'] = false;
		layoutExtra[yax + '.tickvals'] = ageRanges;
		layoutExtra[xax + '.tickmode'] = 'array';
		layoutExtra[xax + '.ticktext'] = ['6%', '3%', '0%', '3%', '6%'];
		layoutExtra[xax + '.tickvals'] = [-0.06, -0.03, 0, 0.03, 0.06];
		layoutExtra[xax + '.range'] = [-0.07, 0.07];
		layoutExtra[xax + '.ticks'] = 'outside';
	}

	for(let i = 1; i <= 3; i++) {
		let xax = 'x' + (i === 1 ? '' : i) + ' domain';
		for(let j = 1; j <= 3; j++) {
			let yax = 'y' + (j === 1 ? '' : j) + ' domain';
			let pos = (i - 1) * 3 + j - 1;
			let uf = uniqueUFs[pos];

			layoutExtra.annotations.push({
				text: uf,
				x: 0.5,
				y: 1.089,
				xref: xax,
				yref: yax,
				showarrow: false
			});
		}
	}

	let layout = makePlotLayout({
		extra: layoutExtra
	});

	// on window resize
	window.addEventListener('resize', () => {
		setWw(window.innerWidth);
	});

	return (
		<>
			<div style={{width: '100%', height: 750, display: 'flex'}}>
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
					Fonte: ?
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
						saveSvgAsPng(svg, `malaria-agesex.png`, { scale: 3 });
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
						a.download = `malaria-agesex.svg`;
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
						a.download = `malaria-agesex.json`;
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
						let csv = ['uf,uf_n,sex,age_range,n,p'];
						data.forEach(row => {
							csv.push(`${row.uf},${row.uf_n},${row.sex},${row.age_range},${row.n},${row.p}`);
						});
						csv = csv.join('\n');
						let b = new Blob([csv]);
						let url = window.URL.createObjectURL(b);
						let a = document.createElement('a');
						a.href = url;
						a.download = `malaria-agesex.csv`;
						a.click();
					}}
				>
					CSV
				</Button>
			</Box>
		</>
	);
});

export default ChartAgeSex;