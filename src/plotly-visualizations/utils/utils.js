const makeSvgObject = (divId) => {
	let svgContainer = document.getElementById(divId);
	let allSvgs = svgContainer.getElementsByTagName('svg');
	let svg = allSvgs[0];
	svg = svg.cloneNode(true);
	for (let i = 1; i < allSvgs.length; i++) {
		if (allSvgs[i].getAttribute('class') === 'icon') continue;
		let title = allSvgs[i].getElementsByTagName('title');
		if (title.length > 0 && title[0].innerHTML === 'plotly-logomark') continue;
		svg.appendChild(allSvgs[i].cloneNode(true));
	}
	return svg;
};

const ColorWay = [
	'#7f1019',
	'#be1724',
	'#ed6e78',
	'#0d456e',
	'#1674b9',
	'#5bafec',
	'#f9b233',
	'#fbc974',
	'#e4d5b7',
	'#6E6E6E',
	'#484848',
	'#333333',
];

/*
	Extra should be like this: {
		'xaxis.range': ...,
		'yaxis.title.font': ...,
		...
	} 
*/
const makePlotLayout = ({ title, minYear, maxYear, xtitle, ytitle, extra }) => {
	let layout = {
		title: title + ' - ' + minYear + ' a ' + maxYear,
		colorway: ColorWay,
		xaxis: {
			title: {
				text: xtitle,
			}
		},
		yaxis: {
			title: {
				text: ytitle,
			}
		},
		font: { family: '\'Roboto\', Arial, Helvetica, sans-serif' },
		transition: {
			duration: 300,
			easing: 'cubic-in-out'
		},
		frame: {
			duration: 0,
			redraw: true
		}
	};

	if(extra) {
		for(let k in extra) {
			let ref = layout;
			let keys = k.split('.');
			for (let i = 0; i < keys.length - 1; i++) {
				if(!(keys[i] in ref))
					ref[keys[i]] = {};
				ref = ref[keys[i]];
			}
			ref[keys[keys.length - 1]] = extra[k];
		}
	}

	return layout;
};

export {
	makeSvgObject,
	makePlotLayout,
	ColorWay
};
