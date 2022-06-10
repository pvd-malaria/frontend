import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartParasitemia } from '../../components/charts';

const VisCruzes = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartParasitemia/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisCruzes/>);