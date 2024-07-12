import React from 'react'
import { IBoxProps } from './interface'
import { default as MUIBox } from '@mui/material/Box'

const Box = (props: IBoxProps) => {
	const { children, ...rest } = props

	return <MUIBox {...rest}>{children}</MUIBox>
}

export default Box
