import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartDeaths } from '../../components/charts';

const VisDeaths = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartDeaths/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisDeaths/>);