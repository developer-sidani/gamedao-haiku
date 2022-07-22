import React, { useEffect } from 'react'

import Script from 'next/script'

import { Card, Typography } from '@mui/material'
import { useCurrentAccountState } from 'hooks/useCurrentAccountState'
import { useCollectablesForUserLazyQuery } from 'src/queries'
import { getKusamaAddressFromAccountState } from 'src/utils/accountUtils'

import CollectablesList from './CollectablesSection/collectablesList'

export function MyCollectablesTab() {
	const [loadCollectables, { loading, data }] = useCollectablesForUserLazyQuery()
	const accountState = useCurrentAccountState()
	useEffect(() => {
		if (accountState) {
			loadCollectables({ variables: { owner: getKusamaAddressFromAccountState(accountState) } })
		}
	}, [accountState])

	return (
		<>
			<Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
			<Card sx={{ padding: 4 }}>
				<Typography variant="h6">My Collectables </Typography>
				<CollectablesList loading={loading} items={data} />
			</Card>
		</>
	)
}