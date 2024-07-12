import { Entity } from "../entity";
import { LookupDataType } from "./interface";
import { LookupData } from "./valueObject";

export class Resources extends Entity {
    private _lookupList: LookupData[]
    constructor(id: string, lookupList: LookupData[]) {
        super(id)
        this._lookupList = lookupList;
    }

    getLookupDataByType(type: LookupDataType): LookupData[] {
        return this._lookupList.filter(lookupData => lookupData.type === type)
    }

    get listLookup(): LookupData[] {
        return this._lookupList.slice()
    }
}