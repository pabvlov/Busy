import { UserInformation } from "./user-information";

export interface Session {
    ok: boolean,
    content: Content
}

export interface Content {
    user:  UserInformation;
    token?: string;
}
