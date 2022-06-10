import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartOccupation } from '../../components/charts';

const VisOccupation = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartOccupation/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisOccupation/>);