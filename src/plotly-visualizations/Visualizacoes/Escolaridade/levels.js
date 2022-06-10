import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartCasesPerEducationLevel } from '../../components/charts';

const VisCasesPerEducationLevel = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartCasesPerEducationLevel/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisCasesPerEducationLevel/>);