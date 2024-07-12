export class TransactionDetailAddress {
	constructor(
		private _addressLine1: string,
		private _addressLine2: string,
		private _addressLine3: string,
		private _city: string,
		private _country: string,
		private _postalCode: string,
	) {}

	public get addressLine1(): string {
		return this._addressLine1
	}

	public get addressLine2(): string {
		return this._addressLine2
	}

	public get addressLine3(): string {
		return this._addressLine3
	}

	public get city(): string {
		return this._city
	}

	public get country(): string {
		return this._country
	}

	public get postalCode(): string {
		return this._postalCode
	}
}

export class TransactionDetailDebitCreditPartyAgent {
	constructor(
		private _id: string,
		private _idType: string,
		private _account: string,
		private _name: string,
		private _address: TransactionDetailAddress,
	) {}

	public get id(): string {
		return this._id
	}

	public get idType(): string {
		return this._idType
	}

	public get account(): string {
		return this._account
	}

	public get name(): string {
		return this._name
	}

	public get address(): TransactionDetailAddress {
		return this._address
	}
}

export class TransactionDetailDebitCreditParty {
	constructor(
		private _id: string,
		private _id2Type: string,
		private _account: string,
		private _name: string,
		private _address: TransactionDetailAddress,
	) {}

	public get id(): string {
		return this._id
	}

	public get id2Type(): string {
		return this._id2Type
	}

	public get account(): string {
		return this._account
	}

	public get name(): string {
		return this._name
	}

	public get address(): TransactionDetailAddress {
		return this._address
	}
}

export class TransactionDetailIncomingOutgoing {
	constructor(
		private _instructionId: string,
		private _businessParticipant: string,
		private _scheme: string,
		private _service: string,
	) {}

	public get instructionId(): string {
		return this._instructionId
	}

	public get businessParticipant(): string {
		return this._businessParticipant
	}

	public get scheme(): string {
		return this._scheme
	}

	public get service(): string {
		return this._service
	}
}

export class TransactionDetailDetailInformation {
	constructor(
		private _service: string,
		private _transactionEndToEndId: string,
		private _transactionReference: string,
		private _transactionReceiptNumber: string,
		private _classification: string,
		private _status: string,
		private _iso20022Flag: boolean,
	) {}

	public get service(): string {
		return this._service
	}

	public get transactionEndToEndId(): string {
		return this._transactionEndToEndId
	}

	public get transactionReference(): string {
		return this._transactionReference
	}

	public get transactionReceiptNumber(): string {
		return this._transactionReceiptNumber
	}

	public get classification(): string {
		return this._classification
	}

	public get status(): string {
		return this._status
	}

	public get iso20022Flag(): boolean {
		return this._iso20022Flag
	}
}

export class TransactionDetailDetailBankEntities {
	constructor(
		private _bank: string,
		private _importance: string,
		private _incomingBankEntity: string,
		private _outgoingBankEntity: string,
	) {}

	public get bank(): string {
		return this._bank
	}

	public get importance(): string {
		return this._importance
	}

	public get incomingBankEntity(): string {
		return this._incomingBankEntity
	}

	public get outgoingBankEntity(): string {
		return this._outgoingBankEntity
	}
}

export class TransactionDetailDetailTransaction {
	constructor(
		private _amount: number,
		private _currencyCode: string,
		private _debitAccountNumber: string,
		private _linkedTransaction: string[],
		private _lastedSubmission: string,
		private _servicerTransactionId: string,
		private _transactionDate: string,
	) {}

	public get amount(): number {
		return this._amount
	}

	public get currencyCode(): string {
		return this._currencyCode
	}

	public get debitAccountNumber(): string {
		return this._debitAccountNumber
	}

	public get linkedTransaction(): string[] {
		return this._linkedTransaction?.slice() || []
	}

	public get lastedSubmission(): string {
		return this._lastedSubmission
	}

	public get servicerTransactionId(): string {
		return this._servicerTransactionId
	}

	public get transactionDate(): string {
		return this._transactionDate
	}
}
export class TransactionDetailDetailInstruction {
	constructor(
		private _instructionIdentification: string,
		private _instructionReference: string,
		private _activityDomain: string,
	) {}

	public get instructionIdentification(): string {
		return this._instructionIdentification
	}

	public get instructionReference(): string {
		return this._instructionReference
	}

	public get activityDomain(): string {
		return this._activityDomain
	}
}

export class TransactionDetailDetail {
	constructor(
		private _transactionId: string,
		private _instruction: TransactionDetailDetailInstruction,
		private _information: TransactionDetailDetailInformation,
		private _bankEntities: TransactionDetailDetailBankEntities,
		private _transaction: TransactionDetailDetailTransaction,
	) {}

	public get transactionId(): string {
		return this._transactionId
	}

	public get instruction(): TransactionDetailDetailInstruction {
		return this._instruction
	}

	public get information(): TransactionDetailDetailInformation {
		return this._information
	}

	public get bankEntities(): TransactionDetailDetailBankEntities {
		return this._bankEntities
	}

	public get transaction(): TransactionDetailDetailTransaction {
		return this._transaction
	}
}

export class TransactionDetailInOut {
	constructor(
		private _incoming: TransactionDetailIncomingOutgoing,
		private _outgoing: TransactionDetailIncomingOutgoing,
	) {}

	public get incoming(): TransactionDetailIncomingOutgoing {
		return this._incoming
	}

	public get outgoing(): TransactionDetailIncomingOutgoing {
		return this._outgoing
	}
}

export class TransactionDetailParty {
	constructor(
		private _debitParty: TransactionDetailDebitCreditParty,
		private _creditParty: TransactionDetailDebitCreditParty,
	) {}

	public get debitParty(): TransactionDetailDebitCreditParty {
		return this._debitParty
	}

	public get creditParty(): TransactionDetailDebitCreditParty {
		return this._creditParty
	}
}

export class TransactionDetailAgent {
	constructor(
		private _debitPartyAgent: TransactionDetailDebitCreditPartyAgent,
		private _creditPartyAgent: TransactionDetailDebitCreditPartyAgent, // private _intermediaryAgent: TransactionDetailDebitCreditPartyAgent,
	) {}

	public get debitPartyAgent(): TransactionDetailDebitCreditPartyAgent {
		return this._debitPartyAgent
	}

	public get creditPartyAgent(): TransactionDetailDebitCreditPartyAgent {
		return this._creditPartyAgent
	}

	// public get intermediaryAgent(): TransactionDetailDebitCreditPartyAgent {
	// 	return this._intermediaryAgent
	// }
}

export class TransactionAdditionDetailsInformationAccount {
	constructor(
		private _accountStatusCode: string,
		private _accountStatusDescription: string,
	) {}

	public get accountStatusCode(): string {
		return this._accountStatusCode
	}

	public get accountStatusDescription(): string {
		return this._accountStatusDescription
	}
}

export class TransactionAdditionDetailsInformationContact {
	constructor(private _emailAddress: string, private _mobileNumber: string) {}

	public get emailAddress(): string {
		return this._emailAddress
	}

	public get mobileNumber(): string {
		return this._mobileNumber
	}
}

export class TransactionAdditionDetailsInformationFinancial {
	constructor(
		private _tepaCode: string,
		private _fcdAmount: number,
		private _fcdCurrency: string,
		private _fcdEquivalentAmount: number,
	) {}

	public get tepaCode(): string {
		return this._tepaCode
	}

	public get fcdAmount(): number {
		return this._fcdAmount
	}

	public get fcdCurrency(): string {
		return this._fcdCurrency
	}

	public get fcdEquivalentAmount(): number {
		return this._fcdEquivalentAmount
	}
}

export class TransactionAdditionDetailsPay {
	constructor(
		private _proxyCustomerType: string,
		private _proxyAccountName: string,
		private _availableBalance: number,
		private _account: TransactionAdditionDetailsInformationAccount,
		private _contact: TransactionAdditionDetailsInformationContact,
		private _financial: TransactionAdditionDetailsInformationFinancial,
	) {}

	public get proxyCustomerType(): string {
		return this._proxyCustomerType
	}

	public get proxyAccountName(): string {
		return this._proxyAccountName
	}

	public get availableBalance(): number {
		return this._availableBalance
	}

	public get account(): TransactionAdditionDetailsInformationAccount {
		return this._account
	}

	public get contact(): TransactionAdditionDetailsInformationContact {
		return this._contact
	}

	public get financial(): TransactionAdditionDetailsInformationFinancial {
		return this._financial
	}
}

export class TransactionAdditionDetailsInformationTransaction {
	constructor(
		private _creationDateTime: string,
		private _expiryDateTime: string,
		private _postedDateTime: string,
		private _dueDate: string,
		private _transactionReceiptNumber: string,
		private _transactionType: string,
		private _status: string,
	) {}

	public get creationDateTime(): string {
		return this._creationDateTime
	}

	public get expiryDateTime(): string {
		return this._expiryDateTime
	}

	public get postedDateTime(): string {
		return this._postedDateTime
	}

	public get dueDate(): string {
		return this._dueDate
	}

	public get transactionReceiptNumber(): string {
		return this._transactionReceiptNumber
	}

	public get transactionType(): string {
		return this._transactionType
	}

	public get status(): string {
		return this._status
	}
}

export class TransactionAdditionDetailsInformationPayment {
	constructor(
		private _onUs: boolean,
		private _paymentMethod: string,
		private _chargeAmount: number,
		private _ibFee: number,
		private _irFee: number,
		private _equivalentAmount: number,
		private _equivalentCurrency: string,
	) {}

	public get onUs(): boolean {
		return this._onUs
	}

	public get paymentMethod(): string {
		return this._paymentMethod
	}

	public get chargeAmount(): number {
		return this._chargeAmount
	}

	public get ibFee(): number {
		return this._ibFee
	}

	public get irFee(): number {
		return this._irFee
	}

	public get equivalentAmount(): number {
		return this._equivalentAmount
	}

	public get equivalentCurrency(): string {
		return this._equivalentCurrency
	}
}

export class TransactionAdditionDetailsInformationBillerReference {
	constructor(
		private _billReference1: string,
		private _billReference2: string,
		private _billReference3: string,
	) {}

	public get billReference1(): string {
		return this._billReference1
	}

	public get billReference2(): string {
		return this._billReference2
	}

	public get billReference3(): string {
		return this._billReference3
	}
}
export class TransactionAdditionDetailsInformationBiller {
	constructor(
		private _billerType: string,
		private _billerCode: string,
		private _billerName: string,
		private _billerProfileId: string,
		private _billerSubType: string,
		private _billReference: TransactionAdditionDetailsInformationBillerReference,
	) {}

	public get billerType(): string {
		return this._billerType
	}

	public get billerCode(): string {
		return this._billerCode
	}

	public get billerName(): string {
		return this._billerName
	}

	public get billerProfileId(): string {
		return this._billerProfileId
	}

	public get billerSubType(): string {
		return this._billerSubType
	}

	public get billReference(): TransactionAdditionDetailsInformationBillerReference {
		return this._billReference
	}
}

export class TransactionAdditionDetailsInformationSender {
	constructor(
		private _senderName: string,
		private _senderId: string,
		private _senderMobile: string,
		private _senderEmail: string,
		private _remittanceInfo: string,
		private _thaiQrTag: string,
		private _annotation: string,
	) {}

	public get senderName(): string {
		return this._senderName
	}

	public get senderId(): string {
		return this._senderId
	}

	public get senderMobile(): string {
		return this._senderMobile
	}

	public get senderEmail(): string {
		return this._senderEmail
	}

	public get remittanceInfo(): string {
		return this._remittanceInfo
	}

	public get thaiQrTag(): string {
		return this._thaiQrTag
	}

	public get annotation(): string {
		return this._annotation
	}
}

export class TransactionAdditionDetailsInformationAddition {
	constructor(
		private _accountServiceReference: string,
		private _exchangeRate: number,
		private _paymentType: string,
		private _additionalNote: string,
	) {}

	public get accountServiceReference(): string {
		return this._accountServiceReference
	}

	public get exchangeRate(): number {
		return this._exchangeRate
	}

	public get paymentType(): string {
		return this._paymentType
	}

	public get additionalNote(): string {
		return this._additionalNote
	}
}

export class TransactionAdditionDetailsInformation {
	constructor(
		private _transaction: TransactionAdditionDetailsInformationTransaction,
		private _payment: TransactionAdditionDetailsInformationPayment,
		private _biller: TransactionAdditionDetailsInformationBiller,
		private _sender: TransactionAdditionDetailsInformationSender,
		private _additional: TransactionAdditionDetailsInformationAddition,
	) {}

	public get transaction(): TransactionAdditionDetailsInformationTransaction {
		return this._transaction
	}

	public get payment(): TransactionAdditionDetailsInformationPayment {
		return this._payment
	}

	public get biller(): TransactionAdditionDetailsInformationBiller {
		return this._biller
	}

	public get sender(): TransactionAdditionDetailsInformationSender {
		return this._sender
	}

	public get additional(): TransactionAdditionDetailsInformationAddition {
		return this._additional
	}
}

export class TransactionAdditionDetails {
	constructor(
		private _information: TransactionAdditionDetailsInformation,
		private _payee: TransactionAdditionDetailsPay,
		private _payer: TransactionAdditionDetailsPay,
	) {}

	public get information(): TransactionAdditionDetailsInformation {
		return this._information
	}

	public get payee(): TransactionAdditionDetailsPay {
		return this._payee
	}

	public get payer(): TransactionAdditionDetailsPay {
		return this._payer
	}
}

export class TransactionDetail {
	constructor(
		private _detail: TransactionDetailDetail,
		private _inOut: TransactionDetailInOut,
		private _party: TransactionDetailParty,
		private _agent: TransactionDetailAgent,
		private _additionalDetails: TransactionAdditionDetails,
	) {}

	public get detail(): TransactionDetailDetail {
		return this._detail
	}

	public get inOut(): TransactionDetailInOut {
		return this._inOut
	}

	public get party(): TransactionDetailParty {
		return this._party
	}

	public get agent(): TransactionDetailAgent {
		return this._agent
	}

	public get additionalDetails(): TransactionAdditionDetails {
		return this._additionalDetails
	}
}
