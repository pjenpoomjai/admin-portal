import Box from 'components/common/Box/Box'
import Image from 'next/image'
import noResultFound from 'public/static/images/no-result-found.png'
import { FC } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import Typography from 'src/components/common/Typography'
import useId from 'utils/useId'
import { INoResultFound } from './interface'

const NoResultFound: FC<INoResultFound> = (props) => {
	const {
		label = 'No results found',
		id = 'data-source-not-found',
		...rest
	} = props

	return (
		<Box {...rest} {...useId(COMPONENT_TYPE.DIV)(id)}>
			<Image
				priority
				src={noResultFound}
				alt="noResultFound"
				{...useId(COMPONENT_TYPE.IMAGE)('noResultFound')}
			/>
			<Typography id="no-result-found" className="pt-2">
				{label}
			</Typography>
		</Box>
	)
}

export default NoResultFound
