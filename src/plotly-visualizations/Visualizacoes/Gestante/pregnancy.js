import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartPregnancy } from '../../components/charts';

const VisPregnancy = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartPregnancy/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisPregnancy/>);