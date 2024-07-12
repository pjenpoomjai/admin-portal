import { render } from '@testing-library/react'
import { TransactionDetailRows } from 'modules/transactions/information/views/TransactionDetailRow/TransactionDetailRow'

describe('TransactionDetailRow : View', () => {
	test('Should render successfully 1 key', () => {
		const { baseElement } = render(
			TransactionDetailRows({
				id: 'row-1',
				data: [
					{
						id: 'r1',
						keys: ['key-1'],
						label: '',
						value: {
							'key-1': 'value-1',
						},
					},
					{
						id: 'r2',
						keys: ['key-1'],
						label: '',
						value: {
							'key-1': 'value-1',
						},
						customText: () => {
							return 'custom'
						},
					},
				],
			}),
		)
		expect(baseElement).toMatchSnapshot()
	})

	test('Should render successfully 2 keys', () => {
		const { baseElement } = render(
			TransactionDetailRows({
				id: 'row-1',
				data: [
					{
						id: 'r1',
						keys: ['key-1', 'key-2'],
						label: '',
						value: {
							'key-1': 'value-1',
							'key-2': 'value-2',
						},
					},
					{
						id: 'r2',
						keys: ['key-1', 'key-2'],
						label: '',
						value: {
							'key-1': 'value-1',
							'key-2': 'value-2',
						},
						customText: () => {
							return 'custom'
						},
					},
				],
			}),
		)
		expect(baseElement).toMatchSnapshot()
	})

	test('Should render successfully 3 keys', () => {
		const { baseElement } = render(
			TransactionDetailRows({
				id: 'row-1',
				data: [
					{
						id: 'r1',
						keys: ['key-1', 'key-2', 'key-3'],
						label: '',
						value: {
							'key-1': 'value-1',
							'key-2': 'value-2',
							'key-3': 'value-3',
						},
					},
					{
						id: 'r2',
						keys: ['key-1', 'key-2', 'key-3'],
						label: '',
						value: {
							'key-1': 'value-1',
							'key-2': 'value-2',
							'key-3': 'value-3',
						},
						customText: () => {
							return 'custom'
						},
					},
				],
			}),
		)
		expect(baseElement).toMatchSnapshot()
	})
})
