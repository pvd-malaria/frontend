import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartCasesPerMonth } from '../../components/charts';

const VisCasesPerMonth = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartCasesPerMonth/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisCasesPerMonth/>);