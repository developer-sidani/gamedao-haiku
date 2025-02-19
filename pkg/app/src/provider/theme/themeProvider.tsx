import { ReactNode, useEffect, useState } from 'react'

import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider, Theme, ThemeOptions, createTheme } from '@mui/material/styles'
import 'react-quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify'
import { ThemePrimaryColor } from 'src/components'
import { useSettings } from 'src/hooks/useSettings'
import breakpoints from 'src/theme/breakpoints'
import GlobalStyles from 'src/theme/globalStyles'
import ComponentsOverrides from 'src/theme/overrides'
import palette from 'src/theme/palette'
import shadows, { customShadows } from 'src/theme/shadows'
import shape from 'src/theme/shape'
import typography from 'src/theme/typography'

// ----------------------------------------------------------------------

type ComponentProps = {
	children: ReactNode
}

export function ThemeProvider({ children }: ComponentProps) {
	const { themeMode, themeDirection } = useSettings()
	const [themeState, setThemeState] = useState<Theme>(null)

	useEffect(() => {
		if (!themeMode || !themeDirection) {
			return
		}

		const isLight = themeMode === 'light'

		const themeOptions: ThemeOptions = {
			palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
			shape,
			typography,
			breakpoints,
			direction: themeDirection,
			shadows: isLight ? shadows.light : shadows.dark,
			customShadows: isLight ? customShadows.light : customShadows.dark,
		}

		const theme = createTheme(themeOptions)
		theme.components = ComponentsOverrides(theme)
		setThemeState(theme)
	}, [themeMode, themeDirection])

	if (!themeState) {
		return null
	}

	return (
		<MuiThemeProvider theme={themeState}>
			<ToastContainer theme={themeMode} />
			<CssBaseline />
			<ThemePrimaryColor>{children}</ThemePrimaryColor>
			<GlobalStyles />
		</MuiThemeProvider>
	)
}
