import AddIcon from 'src/components/common/Icon/Add'
import CheckIcon from 'src/components/common/Icon/Check'
import FileDownloadOutlinedIcon from 'src/components/common/Icon/FileDownloadOutlined'
import SearchIcon from 'src/components/common/Icon/Search'

export const themeColorSx = {
	filled: {
		normal: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--gray-30)',
				borderRadius: '6px',
				backgroundColor: 'var(--violet-500)',
			},
			'&:hover': {
				backgroundColor: 'var(--violet-700)',
			},
			'&:disabled': {
				backgroundColor: 'var(--gray-300)',
			},
			'&:focus': {
				border: '3px solid var(--violet-300)',
			},
		},
		danger: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--gray-30)',
				borderRadius: '6px',
				backgroundColor: 'var(--rose-500)',
			},
			'&:hover': {
				backgroundColor: 'var(--rose-700)',
			},
			'&:disabled': {
				backgroundColor: 'var(--gray-300)',
			},
			'&:focus': {
				border: '3px solid var(--rose-300)',
			},
		},
	},
	outline: {
		normal: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--gray-900)',
				borderRadius: '6px',
				backgroundColor: 'transparent',
			},
			'&.MuiButton-root:not(.MuiButton-text)': {
				border: '1px solid var(--gray-300)',
			},
			'&:hover': {
				backgroundColor: 'var(--gray-100)',
			},
			'&:disabled': {
				color: 'var(--gray-30)',
				backgroundColor: 'var(--violet-200)',
				border: 'unset',
			},
			'&:focus': {
				border: '3px solid var(--violet-300)',
			},
		},
		danger: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--rose-600)',
				borderRadius: '6px',
				backgroundColor: 'transparent',
				border: '1px solid var(--rose-600)',
			},
			'&:hover': {
				backgroundColor: 'var(--rose-100)',
			},
			'&:disabled': {
				color: 'var(--gray-30)',
				backgroundColor: 'var(--rose-200)',
				border: 'unset',
			},
			'&:focus': {
				border: '3px solid var(--rose-300)',
			},
		},
	},
	pill: {
		normal: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--gray-30)',
				borderRadius: '24px',
				backgroundColor: 'var(--violet-500)',
			},
			'&:hover': {
				backgroundColor: 'var(--violet-700)',
			},
			'&:disabled': {
				backgroundColor: 'var(--violet-200)',
			},
			'&:focus': {
				border: '3px var(--violet-300)',
			},
		},
		danger: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--gray-30)',
				borderRadius: '24px',
				backgroundColor: 'var(--rose-500)',
			},
			'&:hover': {
				backgroundColor: 'var(--rose-700)',
			},
			'&:disabled': {
				backgroundColor: 'var(--rose-200)',
			},
			'&:focus': {
				border: '3px var(--rose-300)',
			},
		},
	},
	link: {
		normal: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--violet-500)',
				borderRadius: '6px',
				'box-shadow': '',
				backgroundColor: 'transparent',
			},
			'&:hover': {
				backgroundColor: 'var(--violet-100)',
			},
			'&:disabled': {
				color: 'var(--gary-30)',
				backgroundColor: 'var(--violet-200)',
			},
			'&:focus': {
				backgroundColor: 'transparent',
				border: '3px var(--violet-300)',
			},
		},
		danger: {
			'&.MuiButton-root': {
				textTransform: 'none',
				color: 'var(--rose-600)',
				borderRadius: '6px',
				'box-shadow': '',
				backgroundColor: 'transparent',
			},
			'&:hover': {
				backgroundColor: 'var(--rose-100)',
			},
			'&:disabled': {
				color: 'var(--gary-30)',
				backgroundColor: 'var(--rose-200)',
			},
			'&:focus': {
				backgroundColor: 'transparent',
				border: '3px var(--rose-300)',
			},
		},
	},
}

export const themeColorDangerSx = {
	filled: 'rounded-md',
	outline: 'rounded-md',
	pill: 'rounded-md',
	link: 'rounded-md',
}

// TAILWIND BUTTON SIZE
export const themeSizeClassName = {
	xs: 'h-[30px]',
	sm: 'h-[32px]',
	base: 'h-[34px]',
	lg: 'h-[42px]',
	xl: 'h-[46px]',
}

export const themeFontSize = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-sm',
	lg: 'text-base',
	xl: 'text-base',
}

export const icon = {
	search: <SearchIcon />,
	add: <AddIcon />,
	check: <CheckIcon />,
	download: <FileDownloadOutlinedIcon />,
}
