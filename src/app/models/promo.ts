export interface Promo {
    id?: number,
    promoCode: string,
    percentOff: number,
    durationStart: Date,
    durationEnd: Date,
    singleUse: boolean,
    tickets?: Array<Object>
}