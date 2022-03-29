import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { Layout } from 'src/layouts/default/layout'

export function Organisations() {
	return (
		<Layout showHeader showFooter showSidebar title="Organisations">
			<Box sx={{ p: '4rem', height: '90vh' }}>
				<Paper sx={{ p: '4rem', height: '100%', borderRadius: '.5rem' }} elevation={10}>
					<Typography sx={{ fontWeight: '800' }} variant={'h2'}>
						Organisations.
					</Typography>
				</Paper>
			</Box>
		</Layout>
	)
}

export default Organisations