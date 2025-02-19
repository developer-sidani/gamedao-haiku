import { useCallback, useEffect, useState } from 'react'

import { AddAPhoto, Web } from '@mui/icons-material'
import { Autocomplete, Box, Button, CardMedia, Stack, TextField, Typography } from '@mui/material'
import { useConfig } from 'hooks/useConfig'
import { useTranslation } from 'react-i18next'
import { DisplayValueEntryNumber, useDisplayValuesQuery } from 'src/queries'
import { parseIpfsHash, uploadFileToIpfs } from 'src/utils/ipfs'
import * as Yup from 'yup'

import { Dropzone } from 'components/Dropzone/dropzone'

interface ComponentProps {
	description: string
	header: string
	logo: string
}

const validationDescriptionSchema = Yup.string().required('page:organisations:settings:about:description_error')

export const validationSchema = Yup.object().shape({
	name: Yup.string().required(),
	description: Yup.string().required(),
})

export function About({ description, header, logo }: ComponentProps) {
	const { t } = useTranslation()
	const { data } = useDisplayValuesQuery() || {}

	const [descriptionValue, setDescriptionValue] = useState<string>()
	const [countrySelected, setCountrySelected] = useState(null)
	const [selectedTags, setSelectedTags] = useState([])
	const [headerValue, setHeaderValue] = useState(header)
	const [logoValue, setLogoValue] = useState(logo)
	const [errorState, setErrorState] = useState<string>()

	const config = useConfig()

	const handleUploadHeaderValue = useCallback(async (files: File[]) => {
		if (!files || files.length === 0) return

		const headerFile = new File([await files[0].arrayBuffer()], files[0].name)
		const cid = await uploadFileToIpfs(headerFile)

		setHeaderValue(cid.toString())
	}, [])

	const handleUploadLogoValue = useCallback(async (files: File[]) => {
		if (!files || files.length === 0) return

		const logoFile = new File([await files[0].arrayBuffer()], files[0].name)
		const cid = await uploadFileToIpfs(logoFile)

		setLogoValue(cid.toString())
	}, [])

	useEffect(() => {
		if (description) {
			setDescriptionValue(description)
		}
	}, [description])

	const handleDescriptionChange = useCallback(
		(event) => {
			if (setDescriptionValue) {
				try {
					validationDescriptionSchema.validateSync(event.target.value)
					setErrorState(null)
				} catch (err) {
					setErrorState(err.message)
				}

				setDescriptionValue(event.target.value)
			}
		},
		[setDescriptionValue, setErrorState],
	)

	const handleCountryChange = useCallback(
		(_, newValue) => {
			setCountrySelected(newValue)
		},
		[setCountrySelected],
	)

	const handleTagsChange = useCallback(
		(_, newValue) => {
			setSelectedTags(newValue)
		},
		[setSelectedTags],
	)

	return (
		<>
			<Typography variant="h5">{t('page:organisations:settings:about:title')}</Typography>
			<TextField
				fullWidth
				multiline
				sx={{
					'& fieldset': {
						borderRadius: '5px',
					},
				}}
				onChange={handleDescriptionChange}
				InputLabelProps={{ shrink: !!descriptionValue }}
				value={descriptionValue}
				minRows={4}
				label={t('page:organisations:settings:about:description')}
				variant="outlined"
				error={!!errorState}
			/>
			{errorState && (
				<Typography variant="subtitle2" width="100%" color="error">
					{t(errorState)}
				</Typography>
			)}

			<Dropzone onFilesSelected={handleUploadHeaderValue} options={{ maxFiles: 1, accept: { 'image/*': [] } }}>
				<Box
					display="grid"
					justifyContent="center"
					alignItems="center"
					position="absolute"
					zIndex={1}
					width="100%"
					height="100%"
				>
					<AddAPhoto sx={{ width: '100%', height: '35px' }} />
				</Box>
				<CardMedia
					sx={{ height: '155px' }}
					component="img"
					src={parseIpfsHash(headerValue || header, config.IPFS_GATEWAY)}
					alt="logo"
				/>
			</Dropzone>
			<Dropzone onFilesSelected={handleUploadLogoValue} options={{ maxFiles: 1, accept: { 'image/*': [] } }}>
				<Box
					display="grid"
					justifyContent="center"
					alignItems="center"
					position="absolute"
					zIndex={1}
					width="100%"
					height="100%"
				>
					<AddAPhoto sx={{ width: '100%', height: '35px' }} />
				</Box>
				<CardMedia
					sx={(theme) => ({
						width: '7rem',
						height: '7rem',
						backgroundColor: theme.palette.background.default,
						outline: `1px dashed ${theme.palette.grey['500']} !important`,
						outlineOffset: '5px',
						cursor: 'pointer',
						margin: '10px auto',
						borderRadius: '50%',
					})}
					component="img"
					src={parseIpfsHash(logoValue || logo, config.IPFS_GATEWAY)}
					alt="logo"
				/>
			</Dropzone>

			<TextField
				fullWidth
				label={t('page:organisations:settings:about:website')}
				InputProps={{
					startAdornment: <Web sx={{ width: '20px', height: '20px', mr: '8px' }} />,
				}}
				variant="outlined"
			/>

			<Autocomplete
				options={data?.displayValues?.countries || []}
				sx={{
					'& fieldset': {
						borderRadius: '5px',
					},
				}}
				onChange={handleCountryChange}
				getOptionLabel={(option: DisplayValueEntryNumber) => t(option.text)}
				value={countrySelected}
				renderInput={(params) => (
					<TextField {...params} label={t('page:organisations:settings:about:country')} />
				)}
			/>

			<Autocomplete
				multiple
				limitTags={5}
				options={data?.displayValues?.tags}
				sx={{
					'& fieldset': {
						borderRadius: '5px',
					},
				}}
				getOptionDisabled={() => selectedTags.length >= 5}
				freeSolo
				onChange={handleTagsChange}
				getOptionLabel={(option: DisplayValueEntryNumber) => t(option.text)}
				value={selectedTags}
				renderInput={(params) => <TextField {...params} label={t('page:organisations:settings:about:tags')} />}
			/>
			<Stack spacing={2} sx={{ justifyContent: { xs: 'space-between', sm: 'flex-end' } }} direction="row">
				<Button
					size="large"
					variant="outlined"
					color="primary"
					sx={{ display: 'block', flexGrow: { xs: 1, sm: 0 } }}
					disabled
				>
					{t('page:organisations:settings:about:cta_button')}
				</Button>
			</Stack>
		</>
	)
}
