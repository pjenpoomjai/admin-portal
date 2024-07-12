export class TermsOfUse {
	constructor(
		private _version: number,
		private _language: string,
		private _title: string,
		private _content: string,
	) {}

	public get version(): number {
		return this._version
	}

	public get language(): string {
		return this._language
	}

	public get title(): string {
		return this._title
	}

	public get content(): string {
		return this._content
	}
}

export class TermsAndConditions {
	constructor(private _termsOfUse: TermsOfUse[]) {}

	public get termsOfUse(): TermsOfUse[] {
		return this._termsOfUse.slice()
	}
}
