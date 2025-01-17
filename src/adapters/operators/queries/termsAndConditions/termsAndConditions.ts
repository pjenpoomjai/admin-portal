import { ErrorType, Message } from 'adapters/error'
import { ModelTermsAndConditions } from 'adapters/operators/models'
import {
	ITermsAndConditionsQuery,
	ITermsAndConditionsRequest,
} from 'shared/adapters/interfaces/termsAndConditions/queries'
import { Query } from '../base'
import { transformResponseTermsAndConditions } from './dto'

export class TermsAndConditionsQuery
	extends Query
	implements ITermsAndConditionsQuery
{
	public async getTermsAndConditions(
		_payload: ITermsAndConditionsRequest,
	): Promise<ModelTermsAndConditions.TermsAndConditions> {
		try {
			// const response: any = await this._api.get(
			// 	EndpointKey.pymd,
			// 	RoutePath.PymdTermsAndConditions,
			// 	'',
			// 	{
			// 		data: payload,
			// 	},
			// )

			return transformResponseTermsAndConditions({
				termsOfUse: [
					{
						version: 1.0,
						language: 'en',
						title:
							'Terms in relation to the access to and the use of the Bank’s computer systems and networks.',
						content:
							'By accessing and using the Payment Domain - Admin Portal system of The Siam Commercial Bank Public Company Limited (the “Bank”), you acknowledge that the system is the Bank’s computer system and network, and you agree to access and use the system to perform your assigned duties and in accordance with the Bank’s policies only.|In addition, you agree that the Bank shall have the right to investigate your access to and your use of any Bank’s computer systems and networks in order to control, monitor, and prevent the access and the use which are not in compliance with the Bank’s policies, these terms or the applicable laws and regulations. Failure to access or use the Bank’s computer systems and networks in compliance with the Bank’s policies, these terms or the applicable laws and regulations may cause damage to the Bank, and may also result in a disciplinary actions pursuant to the Bank’s regulations (such as warning, termination of employment), compensation for damages, and/or legal proceedings being undertaken against you.|If you have further inquiries about the access to or the use of the Bank’s computer systems and networks or these terms, please contact helpdesk through the Email: helpdesk@scb.co.th',
					},
					{
						version: 1.0,
						language: 'th',
						title:
							'ข้อกำหนดเกี่ยวกับการเข้าถึงและใช้งานระบบคอมพิวเตอร์และเครือข่ายของธนาคาร',
						content:
							'ในการเข้าถึงและใช้งานระบบ Payment Domain - Admin Portal ของธนาคารไทยพาณิชย์ จำกัด (มหาชน) (“ธนาคาร”) ท่านรับทราบว่า ระบบดังกล่าวเป็นระบบคอมพิวเตอร์และเครือข่ายของธนาคาร และท่านตกลงจะเข้าถึงและใช้งานระบบดังกล่าวเพื่อการปฏิบัติงานตามหน้าที่ที่ได้รับมอบหมาย และตามนโยบายของธนาคารเท่านั้น|นอกจากนี้ ท่านตกลงให้ธนาคารมีสิทธิตรวจสอบการเข้าถึงและใช้งานระบบคอมพิวเตอร์และเครือข่ายใดๆ ของธนาคารของท่าน เพื่อควบคุมดูแล ตรวจสอบ และป้องกันการเข้าถึงและใช้งานที่ไม่สอดคล้องกับนโยบายของธนาคาร ข้อกำหนดนี้ หรือกฎหมายและกฎเกณฑ์ที่เกี่ยวข้อง การที่ท่านเข้าถึงหรือใช้งานระบบคอมพิวเตอร์และเครือข่ายของธนาคารโดยไม่ปฏิบัติตามนโยบายของธนาคาร ข้อกำหนดนี้ หรือกฎหมายและกฎเกณฑ์ที่เกี่ยวข้อง อาจทำให้ธนาคารได้รับความเสียหาย รวมถึงอาจส่งผลให้ท่านได้รับโทษตามระเบียบของธนาคาร (เช่น การตักเตือน การไล่ออก) และท่านอาจต้องชดใช้ค่าเสียหาย และ/หรือถูกดำเนินคดีทางกฎหมายด้วย|หากท่านมีข้อสงสัยเกี่ยวกับการเข้าถึงหรือการใช้งานระบบคอมพิวเตอร์และเครือข่ายของธนาคาร หรือข้อกำหนดนี้ กรุณาติดต่อ helpdesk  ผ่านช่องทาง Email: helpdesk@scb.co.th',
					},
				],
			})
		} catch (e) {
			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}
}
