import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartAvgMonthlyIncome } from '../../components/charts';

const VisIncome = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartAvgMonthlyIncome/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisIncome/>);