import { ErrorType, Message } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { IAuthenMutated } from 'shared/adapters/interfaces/authen/mutates'
import { Mutated } from '../base'
import { EndpointKey } from 'shared/adapters/interfaces'

export class AuthenMutate extends Mutated implements IAuthenMutated {
	public async logout(): Promise<boolean> {
		try {
			await this._api.post(EndpointKey.portal, RoutePath.PymdLogout, '', {})
			return true
		} catch (err) {
			throw new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG)
		}
	}

	public async clearSession(): Promise<boolean> {
		try {
			await this._api.post(
				EndpointKey.portal,
				RoutePath.PymdClearSession,
				'',
				{},
			)
			return true
		} catch (err) {
			throw new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG)
		}
	}
}
