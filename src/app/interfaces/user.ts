export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    reset_code: string,
    facts: Facts[]
}

export interface Token {
    access_token: string
}

export interface Facts {
    id?: number,
    fact_text: string
}