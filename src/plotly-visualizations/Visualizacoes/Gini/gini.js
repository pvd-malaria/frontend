import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartGiniCoefficient } from '../../components/charts';

const VisGini = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartGiniCoefficient/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisGini/>);