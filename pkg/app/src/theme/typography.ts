// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
	interface TypographyVariants {
		small: React.CSSProperties
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		small?: React.CSSProperties
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		small: true
	}
}

// ----------------------------------------------------------------------

function pxToRem(value: number) {
	return `${value / 16}rem`
}

function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
	return {
		'@media (min-width:600px)': {
			fontSize: pxToRem(sm),
		},
		'@edia (min-width:900px)': {
			fontSize: pxToRem(md),
		},
		'@media (min-width:1200px)': {
			fontSize: pxToRem(lg),
		},
	}
}

const FONT_PRIMARY = 'Inter, sans-serif'
// const FONT_SECONDARY = 'Times New Roman, serif'; // Local Font

const typography = {
	fontFamily: FONT_PRIMARY,
	fontWeightRegular: 400,
	fontWeightMedium: 600,
	fontWeightBold: 800,
	h1: {
		fontWeight: 800,
		lineHeight: 80 / 64,
		fontSize: pxToRem(40),
		letterSpacing: 2,
		...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
	},
	h2: {
		fontWeight: 800,
		lineHeight: 64 / 48,
		fontSize: pxToRem(32),
		...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
	},
	h3: {
		fontWeight: 800,
		lineHeight: 1.5,
		fontSize: pxToRem(24),
		...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
	},
	h4: {
		fontWeight: 600,
		lineHeight: 1.5,
		fontSize: pxToRem(20),
		...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
	},
	h5: {
		fontWeight: 600,
		lineHeight: 1.5,
		fontSize: pxToRem(18),
		...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
		marginBottom: '1rem',
	},
	h6: {
		fontWeight: 600,
		lineHeight: 28 / 18,
		fontSize: pxToRem(17),
		...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
	},
	subtitle1: {
		fontWeight: 600,
		lineHeight: 1.5,
		fontSize: pxToRem(16),
	},
	subtitle2: {
		fontWeight: 800,
		lineHeight: 22 / 14,
		fontSize: pxToRem(14),
	},
	body1: {
		lineHeight: 1.5,
		fontSize: pxToRem(16),
	},
	body2: {
		lineHeight: 22 / 14,
		fontSize: pxToRem(14),
	},
	small: {
		lineHeight: 22 / 14,
		fontSize: pxToRem(8),
	},
	caption: {
		lineHeight: 1.5,
		fontSize: pxToRem(12),
		marginBottom: '1rem',
	},
	overline: {
		fontWeight: 800,
		lineHeight: 1.5,
		fontSize: pxToRem(12),
		textTransform: 'uppercase',
	},
	button: {
		fontWeight: 800,
		lineHeight: 24 / 14,
		fontSize: pxToRem(14),
		textTransform: 'capitalize',
	},
} as const

export default typography
