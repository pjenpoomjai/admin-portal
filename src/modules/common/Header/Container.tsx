import HeaderNavbar from 'components/template/HeaderNavbar/HeaderNavbar'
import { FC } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import { IHeader, IHeaderRenderProps } from './interface'

const Container: FC<IHeader> = ({
	onLogoutHandler,
	displayName,
	lastLogon,
}: IHeaderRenderProps) => {
	return (
		<div {...useId(COMPONENT_TYPE.DIV)('root-header')}>
			<HeaderNavbar
				lastLogon={lastLogon}
				displayName={displayName}
				onLogout={onLogoutHandler}
			/>
		</div>
	)
}

export default Container
