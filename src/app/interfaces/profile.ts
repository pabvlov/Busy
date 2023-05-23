import { User } from "./user";
import { WorkInformation } from "./work-information";

export interface Profile {
    user:            User[];
    workInformation: WorkInformation[];
}
