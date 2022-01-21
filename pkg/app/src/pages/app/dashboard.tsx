import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { Layout } from 'src/layouts/default'

export function DashboardPage() {
	return (
		<Layout showHeader showFooter showSidebar title="Dashboard">
			<Box sx={{ p: '4rem', height: '90vh' }}>
				<Paper sx={{ p: '4rem', height: '100%', borderRadius: '.5rem' }} elevation={10}>
					<Typography sx={{ fontWeight: '800' }} variant={'h2'}>
						Hello.
					</Typography>
				</Paper>
			</Box>
		</Layout>
	)
}

export default DashboardPage
