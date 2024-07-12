import { Collapse, Grid } from '@mui/material'
import classnames from 'classnames'
import { AutocompleteSelectAsyncForm } from 'components/common/AutocompleteSelectAsync'
import { DatePickerForm } from 'components/common/DatePicker'
import { AutoCompletedAsyncFormResource } from 'components/smartComponent/compositions/AutoCompletedAsyncResource'
import { ResourceKey } from 'contexts/resource/interface'
import { DateTime } from 'luxon'
import React from 'react'
import { InputForm } from 'src/components/common/Input'
import { max, onlyDouble, onlyNumber } from 'utils/normalizeInput'
import FieldSet from '../FieldSet'
import { ISearchForm } from './interface'
import defaultClasses from './searchForm.module.css'

const max50 = max(50)
const max20 = max(20)
const max4 = max(4)

const SearchForm: React.FC<ISearchForm> = (props) => {
	const { control, isAdvanceSearch, options, onChangeValidate } = props
	const minDate = DateTime.now()
		.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
		.minus({ day: 179 })

	return (
		<Grid
			container
			rowSpacing={1}
			columnSpacing={3}
			className={classnames(defaultClasses.input)}
		>
			<Grid item xs={4}>
				<FieldSet
					id="instruction-id"
					title="Instruction ID"
					tooltipText="Full term search only"
				>
					<InputForm
						id="instruction-id"
						name="instructionId"
						control={control as any}
						normalizes={[max50]}
						classNames={defaultClasses.highlight}
						onChange={(event) => {
							onChangeValidate('instructionId', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="transaction-date-from" title="Transaction Date/Time From">
					<DatePickerForm
						id="transaction-date-from"
						name="transactionDateFrom"
						type="DateTime"
						control={control as any}
						classNames={classnames(defaultClasses.datePicker)}
						inputProps={{
							id: 'transaction-date-from-date-picker',
						}}
						minDate={minDate}
						onChange={(value) => {
							onChangeValidate('transactionDateFrom', value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="transaction-date-to" title="Transaction Date/Time To">
					<DatePickerForm
						id="transaction-date-to"
						name="transactionDateTo"
						type="DateTime"
						control={control as any}
						classNames={classnames(defaultClasses.datePicker)}
						editableInput={false}
						inputProps={{
							id: 'transaction-date-to-date-picker',
						}}
						minDate={minDate}
						onChange={(value) => {
							onChangeValidate('transactionDateTo', value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="service" title="Service">
					<AutoCompletedAsyncFormResource
						resourcekey={ResourceKey.Service}
						name="service"
						control={control as any}
						autoCompleteProps={{
							classNameContainer: defaultClasses.select,
							disabled: false,
							id: 'service',
							valueIndex: 'value',
							labelIndex: 'label',
							additionalOptions: options.serviceOptions,
							debounce: 300,
							height: 35,
							disableClearable: true,
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="amount-from" title="Amount From">
					<InputForm
						id="amount-from"
						name="amountFrom"
						control={control as any}
						classNames={defaultClasses.highlight}
						normalizes={[onlyDouble, max20]}
						onChange={(event) => {
							onChangeValidate('amountFrom', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="amount-to" title="Amount To">
					<InputForm
						id="amount-to"
						name="amountTo"
						control={control as any}
						classNames={defaultClasses.highlight}
						normalizes={[onlyDouble, max20]}
						onChange={(event) => {
							onChangeValidate('amountTo', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet
					id="instruction-reference"
					title="Instruction Reference"
					tooltipText="Full term search only"
				>
					<InputForm
						id="instruction-reference"
						name="instructionReference"
						control={control as any}
						normalizes={[max50]}
						classNames={defaultClasses.highlight}
						onChange={(event) => {
							onChangeValidate('instructionReference', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="channel" title="Channel">
					<AutoCompletedAsyncFormResource
						resourcekey={ResourceKey.Channel}
						name="channel"
						control={control as any}
						autoCompleteProps={{
							classNameContainer: defaultClasses.select,
							disabled: false,
							id: 'channel',
							valueIndex: 'value',
							labelIndex: 'label',
							debounce: 300,
							height: 35,
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="currency" title="Currency">
					<AutoCompletedAsyncFormResource
						resourcekey={ResourceKey.Currency}
						name="currency"
						control={control as any}
						autoCompleteProps={{
							classNameContainer: defaultClasses.select,
							disabled: false,
							id: 'currency',
							valueIndex: 'value',
							labelIndex: 'label',
							debounce: 300,
							height: 35,
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet
					id="transaction-end-to-end-id"
					title="Transaction End to End ID"
					tooltipText="Full term search only"
				>
					<InputForm
						id="transaction-end-to-end-id"
						name="transactionEndToEndId"
						control={control as any}
						normalizes={[max50]}
						classNames={defaultClasses.highlight}
						onChange={(event) => {
							onChangeValidate('transactionEndToEndId', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="debit-party-account" title="Debit Party Account">
					<InputForm
						id="debit-party-account"
						name="debitPartyAccount"
						control={control as any}
						classNames={defaultClasses.highlight}
						normalizes={[onlyNumber, max20]}
						onChange={(event) => {
							onChangeValidate('debitPartyAccount', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="debit-party-account-code" title="Debit Party Bank Code">
					<InputForm
						id="debit-party-account-code"
						name="debitPartyAccountCode"
						control={control as any}
						normalizes={[onlyNumber, max4]}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet
					id="transaction-reference"
					title="Transaction Reference"
					tooltipText="Full term search only"
				>
					<InputForm
						id="transaction-reference"
						name="transactionReference"
						control={control as any}
						normalizes={[max50]}
						classNames={defaultClasses.highlight}
						onChange={(event) => {
							onChangeValidate('transactionReference', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="credit-party-account" title="Credit Party Account">
					<InputForm
						id="credit-party-account"
						name="creditPartyAccount"
						control={control as any}
						normalizes={[onlyNumber, max20]}
						classNames={defaultClasses.highlight}
						onChange={(event) => {
							onChangeValidate('creditPartyAccount', event.target.value)
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="credit-party-account-code" title="Credit Party Bank Code">
					<InputForm
						id="credit-party-account-code"
						name="creditPartyAccountCode"
						control={control as any}
						normalizes={[onlyNumber, max4]}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="transaction-types" title="Transaction Type">
					<AutoCompletedAsyncFormResource
						resourcekey={ResourceKey.TransactionType}
						name="transactionTypes"
						control={control as any}
						autoCompleteProps={{
							classNameContainer: defaultClasses.select,
							disabled: false,
							id: 'transactionTypes',
							valueIndex: 'value',
							labelIndex: 'label',
							debounce: 300,
							height: 35,
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="classification" title="Classification">
					<AutoCompletedAsyncFormResource
						resourcekey={ResourceKey.Classification}
						name="classification"
						control={control as any}
						autoCompleteProps={{
							classNameContainer: defaultClasses.select,
							disabled: false,
							id: 'classification',
							valueIndex: 'value',
							labelIndex: 'label',
							debounce: 300,
							height: 35,
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid item xs={4}>
				<FieldSet id="status" title="Status">
					<AutoCompletedAsyncFormResource
						resourcekey={ResourceKey.Status}
						name="status"
						control={control as any}
						autoCompleteProps={{
							classNameContainer: defaultClasses.select,
							disabled: false,
							id: 'status',
							valueIndex: 'value',
							labelIndex: 'label',
							debounce: 300,
							height: 35,
						}}
					/>
				</FieldSet>
			</Grid>
			<Grid
				item
				xs={12}
				className={isAdvanceSearch ? undefined : '!p-0 !min-h-0'}
			>
				<Collapse orientation="vertical" in={isAdvanceSearch}>
					<Grid container rowSpacing={1} columnSpacing={3}>
						<Grid item xs={4}>
							<FieldSet id="on-us-flag" title="On-us flag">
								<AutocompleteSelectAsyncForm
									name="onUsFlag"
									control={control as any}
									autoCompleteProps={{
										classNameContainer: defaultClasses.select,
										disabled: false,
										options: options.onUsFlagOptions,
										id: 'on-us-flag',
										valueIndex: 'value',
										labelIndex: 'label',
										debounce: 300,
										height: 35,
									}}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="payerTepa-code" title="Payer TEPA Code">
								<InputForm
									id="payerTepa-code"
									name="payerTepaCode"
									control={control as any}
									normalizes={[max4]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="sender-e-wallet-id" title="Sender E-wallet ID">
								<InputForm
									id="sender-e-wallet-id"
									name="senderEWalletId"
									control={control as any}
									normalizes={[max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet
								id="account-service-reference"
								title="Account service reference"
							>
								<InputForm
									id="account-service-reference"
									name="accountServiceReference"
									control={control as any}
									normalizes={[max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet
								id="transaction-receipt-number"
								title="Transaction receipt number"
							>
								<InputForm
									id="transaction-receipt-number"
									name="transactionReceiptNumber"
									control={control as any}
									normalizes={[max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="debit-party-id" title="Debit Party ID">
								<InputForm
									id="debit-party-id"
									name="debitPartyId"
									control={control as any}
									normalizes={[onlyNumber, max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="credit-party-id" title="Credit Party ID">
								<InputForm
									id="credit-party-id"
									name="creditPartyId"
									control={control as any}
									normalizes={[onlyNumber, max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="bill-reference-1" title="Bill Reference 1">
								<InputForm
									id="bill-reference-1"
									name="billReference1"
									control={control as any}
									normalizes={[max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="bill-reference-2" title="Bill Reference 2">
								<InputForm
									id="bill-reference-2"
									name="billReference2"
									control={control as any}
									normalizes={[max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="bill-reference-3" title="Bill Reference 3">
								<InputForm
									id="bill-reference-3"
									name="billReference3"
									control={control as any}
									normalizes={[max50]}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="payment-method" title="Payment method">
								<AutoCompletedAsyncFormResource
									resourcekey={ResourceKey.PaymentMethod}
									name="paymentMethod"
									control={control as any}
									autoCompleteProps={{
										classNameContainer: defaultClasses.select,
										disabled: false,
										id: 'payment-method',
										valueIndex: 'value',
										labelIndex: 'label',
										debounce: 300,
										height: 35,
									}}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet
								id="external-clearing-system"
								title="External Clearing System"
							>
								<AutocompleteSelectAsyncForm
									name="externalClearingSystem"
									control={control as any}
									autoCompleteProps={{
										classNameContainer: defaultClasses.select,
										disabled: true,
										options: options.externalClearingSystemOptions,
										id: 'external-clearing-system',
										valueIndex: 'value',
										labelIndex: 'label',
										debounce: 300,
										height: 35,
									}}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="kym-limit-check" title="KYM Limit Check">
								<AutocompleteSelectAsyncForm
									name="kymLimitCheck"
									control={control as any}
									autoCompleteProps={{
										classNameContainer: defaultClasses.select,
										disabled: false,
										id: 'kym-limit-check',
										options: options.kymOptions,
										valueIndex: 'value',
										labelIndex: 'label',
										debounce: 300,
										height: 35,
									}}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="outbound-inbound" title="Outbound/Inbound">
								<AutocompleteSelectAsyncForm
									name="outboundInbound"
									control={control as any}
									autoCompleteProps={{
										classNameContainer: defaultClasses.select,
										disabled: false,
										id: 'outbound-inbound',
										options: options.outboundInboundOptions,
										valueIndex: 'value',
										labelIndex: 'label',
										debounce: 300,
										height: 35,
									}}
								/>
							</FieldSet>
						</Grid>
						<Grid item xs={4}>
							<FieldSet id="20022-flag" title="20022 Flag">
								<AutocompleteSelectAsyncForm
									name="20022Flag"
									control={control as any}
									autoCompleteProps={{
										classNameContainer: defaultClasses.select,
										disabled: false,
										options: options.flagOptions,
										id: '20022-flag',
										valueIndex: 'value',
										labelIndex: 'label',
										debounce: 300,
										height: 35,
									}}
								/>
							</FieldSet>
						</Grid>
					</Grid>
				</Collapse>
			</Grid>
		</Grid>
	)
}

export default SearchForm
