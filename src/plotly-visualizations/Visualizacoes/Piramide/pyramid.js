import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartAgeSex } from '../../components/charts';

const VisPyramid = () => {

	return (
		<div style={{width: '100%', height: '100%'}}>
			<ChartAgeSex/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisPyramid/>);