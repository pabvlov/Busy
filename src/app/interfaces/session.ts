import { User } from "./user"

export interface Session {
    ok: boolean,
    content: Content
}

export interface Content {
    user:  User;
    token: string;
}
