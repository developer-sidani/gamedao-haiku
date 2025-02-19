import React, { Fragment, useCallback } from 'react'

import { useRouter } from 'next/router'

import {
	Box,
	Button,
	Drawer,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Link as MUILink,
	Stack,
	Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { SiDiscord, SiGithub, SiLinkedin, SiTelegram, SiTwitter } from 'react-icons/si'
import { FontIcons } from 'src/components'

interface ComponentProps {
	onClose: () => void
	open: boolean
}

// TODO: Extract to features / graphql
const urls = [
	{
		name: 'button:navigation:organisations',
		path: '/organisations',
		icon: 'organization',
	},
	{
		name: 'button:navigation:campaigns',
		path: '/campaigns',
		icon: 'campaign',
	},
	{
		name: 'button:navigation:documentation',
		path: 'https://docs.gamedao.co/',
		icon: 'document',
		external: true,
	},
	{
		name: 'button:navigation:faucet',
		path: 'https://discord.com/channels/273529551483699200/772045307021885452',
		icon: 'store',
		external: true,
	},
]

const Link = ({ href, children }) => (
	<Box>
		<MUILink variant="inherit" href={href} target="_blank" underline="none" rel="noreferrer" color="inherit">
			{children}
		</MUILink>
	</Box>
)

export function NavbarMobile({ onClose, open }: ComponentProps) {
	const theme = useTheme()
	const { t } = useTranslation()
	const { push } = useRouter()

	const handleClick = useCallback(
		(url, external) => {
			if (external) {
				window.open(url, '_blank', 'noopener')
			} else {
				push(url)
			}
		},
		[push],
	)

	return (
		<Drawer
			anchor="right"
			onClose={onClose}
			open={open}
			variant="temporary"
			sx={{
				'& .MuiPaper-root': {
					width: '80vw',
					bottom: 0,
					height: 'auto',
					backgroundColor: theme.palette.background.paper,
				},
			}}
		>
			<Stack p={4} justifyContent="space-between" height="100%">
				<Stack spacing={2}>
					{urls.map((navItem) => {
						return (
							<Fragment key={navItem.name}>
								<ListItemButton onClick={() => handleClick(navItem.path, navItem.external)}>
									<ListItemIcon>
										<FontIcons name={navItem.icon} />
									</ListItemIcon>
									<ListItemText primary={t(navItem.name)} />
								</ListItemButton>
							</Fragment>
						)
					})}
				</Stack>

				<Stack alignItems="center" spacing={4}>
					{/*TODO: Should come from graphql and not be called like this + translations */}
					<Box alignItems="center">
						<Typography textAlign="center">Need help?</Typography>
						<Typography pb={2} textAlign="center">
							Check the docs!
						</Typography>
						<Button
							variant="outlined"
							color="info"
							onClick={() => window.open('https://docs.gamedao.co').focus()}
						>
							Documentation
						</Button>
					</Box>

					<Stack direction="row" spacing={2}>
						<Link href="https://discord.gg/P7NHWGzJ7r">
							<SiDiscord size="25" />
						</Link>
						<Link href="https://t.me/gamedaoco">
							<SiTelegram size="25" />
						</Link>
						<Link href="https://twitter.com/gamedaoco">
							<SiTwitter size="25" />
						</Link>
						<Link href="https://github.com/gamedaoco">
							<SiGithub size="25" />
						</Link>
						<Link href="https://www.linkedin.com/company/gamedaoco">
							<SiLinkedin size="25" />
						</Link>
					</Stack>
				</Stack>
			</Stack>
		</Drawer>
	)
}
