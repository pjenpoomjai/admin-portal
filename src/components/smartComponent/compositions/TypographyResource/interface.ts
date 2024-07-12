import { ITypographyProps } from 'components/common/Typography/interface'
import { IConsumeResourceProps } from 'components/smartComponent/resourceConnector/interface'

export interface ITypographyResourceProps
	extends IConsumeResourceProps,
		Omit<ITypographyProps, 'children'> {
	label: string
	notmatchlabel: string
}
