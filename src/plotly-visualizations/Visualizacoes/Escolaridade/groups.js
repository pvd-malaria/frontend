import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartEducationGroups } from '../../components/charts';

const VisEducationGroups = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartEducationGroups/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisEducationGroups/>);