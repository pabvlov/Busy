import { Jobs } from "./jobs";
import { Service } from "./service";
import { User } from "./user";

export interface Profile {
    user:            User[];
    workInformation: Jobs[];
    serviceInformation: Service[];
}
