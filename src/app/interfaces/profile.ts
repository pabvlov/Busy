import { Jobs } from "./jobs";
import { User } from "./user";

export interface Profile {
    user:            User[];
    workInformation: Jobs[];
}
