import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import {
	createTheme,
	ThemeProvider as MuiThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles'
import { IContextBuilderResult } from 'x-core-modules/builder'

const font = ['Kanit', 'Inter', '"IBM Plex Sans Thai"'].join(',')
const theme = createTheme({
	typography: {
		fontFamily: font,
	},
	components: {
		MuiTypography: {
			defaultProps: {
				fontFamily: font,
			},
		},
	},
})

const ThemeProvider: IContextBuilderResult = {
	name: 'themeProvider',
	Provider: ({ children }) => {
		return (
			<StyledEngineProvider injectFirst>
				<MuiThemeProvider theme={theme}>
					<ScopedCssBaseline />
					{children}
				</MuiThemeProvider>
			</StyledEngineProvider>
		)
	},
}

export default ThemeProvider
