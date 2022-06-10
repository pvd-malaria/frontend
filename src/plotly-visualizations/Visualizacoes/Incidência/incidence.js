import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartIncidenceRate } from '../../components/charts';

const VisIncidence = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartIncidenceRate/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisIncidence/>);