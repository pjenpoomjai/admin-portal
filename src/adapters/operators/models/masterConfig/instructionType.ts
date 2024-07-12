import { MasterConfig } from './masterConfig'

export class InstructionTypeInfo {
	constructor(
		private _instructionTypeId: string,
		private _instructionType: string,
		private _activeStatus: boolean,
	) {}

	public get instructionTypeId(): string {
		return this._instructionTypeId
	}

	public get instructionType(): string {
		return this._instructionType
	}

	public get activeStatus(): boolean {
		return this._activeStatus
	}
}

export class MasterConfigInstructionType extends MasterConfig<InstructionTypeInfo> {}
