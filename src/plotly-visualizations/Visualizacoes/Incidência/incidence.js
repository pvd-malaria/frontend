import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartIncidenceRate } from '../../components/charts';
import { Tabs, Tab, Box } from '@mui/material';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const VisIncidence = () => {
	const [tab, setTab] = React.useState(0);

	return (
		<div style={{width: '100%', height: '100%'}}>
			<Box sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Tabs value={tab} onChange={(e, nv) => setTab(nv)} aria-label="incidencia tabs">
					<Tab label="Incidence Rate" {...a11yProps(0)} />
					<Tab label="Incidence Rate (Logs)" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<ChartIncidenceRate hasLogs={tab === 1}/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisIncidence/>);