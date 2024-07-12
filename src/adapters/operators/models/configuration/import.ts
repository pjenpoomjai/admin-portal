export class ProcessRecord {
	constructor(private _new: number, private _update: number) {}

	public get new(): number {
		return this._new
	}

	public get update(): number {
		return this._update
	}
}

export class Process {
	constructor(private _configName: string, private _record: ProcessRecord) {}

	public get configName(): string {
		return this._configName
	}

	public get record(): ProcessRecord {
		return this._record
	}
}

export class ProcessFailDetailTarget {
	constructor(
		private _row: number | null,
		private _column: number | null,
		private _detail: string,
	) {}

	public get row(): number | null {
		return this._row
	}

	public get column(): number | null {
		return this._column
	}

	public get detail(): string {
		return this._detail
	}
}

export class ProcessFailDetail {
	constructor(
		private _configName: string,
		private _target: ProcessFailDetailTarget[],
	) {}

	public get configName(): string {
		return this._configName
	}

	public get target(): ProcessFailDetailTarget[] {
		return this._target.slice()
	}
}

export class ConfigurationImport {
	constructor(
		private _process: Process[],
		private _processFailDetail: ProcessFailDetail[],
	) {}

	public get process(): Process[] {
		return this._process.slice()
	}

	public get processFailDetail(): ProcessFailDetail[] {
		return this._processFailDetail.slice()
	}
}
