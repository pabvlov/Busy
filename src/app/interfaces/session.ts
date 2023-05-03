export interface Session {
    ok: boolean,
    content: {
        rut: string,
        token?: string,
        nombres?: string,
        apellidos?: string,
        mail?: string,
        foto?: string
    }
}
