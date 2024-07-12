import { COMPONENT_TYPE } from 'shared/componentType'

const useId = (componentType: COMPONENT_TYPE) => {
	return (id?: number | string) => {
		if (!id) {
			return {}
		}

		const embedId = `${id}-${componentType}`

		if (process.env.APP_ENV === 'prod')
			return {
				'data-id': embedId,
			}

		return {
			'data-id': embedId,
			'data-testid': embedId,
		}
	}
}

export default useId
