export interface User {
    id?: number,
    firstAndLastNames: string,
    email: string,
    userName: string,
    isEnabled: boolean,
    roles: Array<string>
}

