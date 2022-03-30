import { useExtensionContext } from 'src/provider/extension/modules/context'
import { NavLink } from 'src/components/NavLink/navLink'
import { useTheme } from '@mui/material/styles'
import { Typography, Card, Box, CardHeader, CardContent, Avatar } from '@mui/material'
import { Person, Key, KeyOff, Check } from '@mui/icons-material'

const gateway = 'https://ipfs.gamedao.co/gateway/'
const toLink = '/app/organisations/'

export const TileCard = (props) => {
	const { selectedAccount } = useExtensionContext()
	const theme = useTheme()
	const bgPlain = { backgroundColor: theme.palette.grey[500_16] }
	const title = props.data.name.length > 17 ? `${props.data.name.slice(0, 17)} ...` : props.data.name
	const address = selectedAccount?.account.address

	const SubHeader = () => {
		return (
			<Box sx={{ display: 'flex', gap: '5px', alignItems: 'stretch' }}>
				<Person />
				<span>{`${props.data?.members.length} ${props.data?.members.length > 1 ? 'Members' : 'Member'} `}</span>
				{props.data.members.find((member) => member.identity.id === address) ? (
					<>
						<span>
							<Check />
						</span>
						<span>{'Joined'}</span>
					</>
				) : (
					<>
						<span>{props.data?.access === 0 ? <KeyOff /> : <Key />}</span>
						<span>{props.data?.access === 0 ? 'Public' : 'Private'}</span>
					</>
				)}
			</Box>
		)
	}

	return (
		<NavLink href={`${toLink}${props.data.id}`}>
			<Card
				sx={{
					width: '344px',
					height: '172px',
					borderRadius: '16px',
					background: '#212B36',
					'&:hover': { borderColor: 'primary.main' },
					...bgPlain,
				}}
			>
				<CardHeader
					avatar={
						<Avatar src={`${gateway}${props.metadata?.logo}`} sx={{ width: 64, height: 64 }}>
							{title.slice(0, 1)}
						</Avatar>
					}
					title={title}
					subheader={<SubHeader />}
				/>
				<CardContent>
					<Typography
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							'-webkit-line-clamp': '2',
							'-webkit-box-orient': 'vertical',
						}}
					>
						{props.metadata?.description}
					</Typography>
				</CardContent>
			</Card>
		</NavLink>
	)
}