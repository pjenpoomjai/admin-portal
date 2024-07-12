import { AutocompleteInputChangeReason as AutocompleteInputChangeReasonFromMui } from '@mui/material/Autocomplete'

export type AutocompleteInputChangeReason =
	| AutocompleteInputChangeReasonFromMui
	| 'enter'
	| 'blur'
