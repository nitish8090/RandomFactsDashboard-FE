export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    reset_code: string,
    facts: Facts[],
    is_admin: Boolean,

    address: string,
    post_code: string,
    landmark: string,
    education: string,
    country: string,
    state: string
}

export interface Token {
    access_token: string,
    is_rf_admin?: Boolean
}

export interface Facts {
    id?: number,
    fact_text: string
}