export interface Promo {
    id?: number,
    promoCode: string,
    percentOff: number,
    durationEnd: Date,
    singleUse: boolean,
    tickets?: Array<Object>,
    isUsed?: boolean
}