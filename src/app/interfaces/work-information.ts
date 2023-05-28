import { Applier } from "./applier";
import { Jobs } from "./jobs";

export interface WorkInformation {
    work: Jobs;
    appliers: Applier[];
}
