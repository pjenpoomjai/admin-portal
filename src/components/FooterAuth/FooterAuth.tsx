import Typography from 'components/common/Typography'
import { FC } from 'react'
import version from 'utils/version'
import { useFooterAuth } from './controller'
import { Button } from 'components/common'
import { ITermsAndConditions } from './interface'
import Box from 'components/common/Box/Box'

const renderTermsAndConditions = (terms: ITermsAndConditions[]) => {
	return (
		<Box>
			{terms.map((term, indexTerm) => {
				const contents = term.content.split('|')
				const contentsRendered = contents.map((sentence, index) => {
					return (
						<>
							<Typography
								id={`term-${term.version}-${term.language}-content-${index}`}
								className="text-sm break-normal"
							>
								{sentence}
							</Typography>
							{index !== sentence.length - 1 && <div className="my-2" />}
						</>
					)
				})
				return (
					<>
						{indexTerm !== 0 && <br />}
						<Typography
							id={`term-${term.version}-${term.language}-title`}
							className={`text-base break-normal underline ${
								indexTerm === 0 ? 'pt-4' : 'pt-0'
							}`}
						>
							{term.title}
						</Typography>
						<div className="my-2" />
						{contentsRendered}
					</>
				)
			})}
		</Box>
	)
}

const FooterAuth: FC = () => {
	const { triggerTermsAndConditions } = useFooterAuth({
		renderTermsAndConditions,
	})

	return (
		<div className="bg-transparent w-full text-center flex justify-center py-6">
			<Typography id="copyright" className="text-gray-500 text-xs">
				Copyright ©2024 Produced by SCB Tech X
			</Typography>
			<Typography id="separator1" className="text-gray-500 text-xs px-2">
				|
			</Typography>
			<Typography id="version" className="text-gray-500 text-xs">
				Version {version}
			</Typography>
			<Typography id="separator2" className="text-gray-500 text-xs px-2">
				|
			</Typography>
			<Button
				id="termsAndConditions"
				onClick={() => triggerTermsAndConditions()}
				className="!text-gray-500 text-xs p-0 hover:bg-transparent hover:border-none hover:shadow-none"
				themetype="link"
			>
				Terms & Conditions
			</Button>
		</div>
	)
}

export default FooterAuth
