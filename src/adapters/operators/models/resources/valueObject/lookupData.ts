import { LookupDataType } from "../interface";

export class LookupData {
    private _type: LookupDataType
    private _name: string
    private _value: string

    constructor(type: LookupDataType, name: string, value: string) {
        this._type = type
        this._name = name
        this._value = value
    }

    get name(): string { return this._name }
    get value(): string { return this._value }
    get type(): LookupDataType { return this._type }
}