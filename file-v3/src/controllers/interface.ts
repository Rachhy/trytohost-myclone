export interface Item {
    id            : number
    status        : { id: number, name: string, color: string }
    name          : string
    abbre         : string
    icon          : string
    size          : string
    files         : number
    secret        : string
    username      : string
    password      : string
    authorized_ip?: string | null,
    modified_at   : Date
}
