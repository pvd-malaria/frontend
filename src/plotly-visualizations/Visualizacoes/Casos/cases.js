import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartCasesPerMonth } from '../../components/charts';
import { Tabs, Tab, Box } from '@mui/material';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const VisCasesPerMonth = () => {
	const [tab, setTab] = React.useState(0);

	return (
		<div style={{width: '100%', height: '100%'}}>
			<Box sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Tabs value={tab} onChange={(e, nv) => setTab(nv)} aria-label="casos tabs">
					<Tab label="Lines" {...a11yProps(0)} />
					<Tab label="Bubbles" {...a11yProps(1)} />
					<Tab label="Lines (Logs)" {...a11yProps(2)} />
					<Tab label="Bubbles (Logs)" {...a11yProps(3)} />
				</Tabs>
			</Box>
			<ChartCasesPerMonth hasLines={tab === 0 || tab === 2} hasLogs={tab === 2 || tab === 3}/>
		</div>
	);
};

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<VisCasesPerMonth/>);