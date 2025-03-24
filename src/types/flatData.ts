import { Dayjs } from "dayjs";

export type FlatData = {
    imgUrl: string,
    city: string,
    streetName: string,
    streetNumber: number,
    areaSize: number,
    hasAC: boolean,
    yearBuilt: number,
    rentPrice: number,
    dateAvailable: Dayjs,
    flatOwnerId: string,
    id: string
}