export interface ILookupData {
    lookupType: string
    lookupName: string
    lookupValue: string
}

export interface ILookupDataResponse {
	data: ILookupData[]
}