import { Service } from "encore.dev/service";

// Encore will consider this directory and all its subdirectories as part of the "equipment" service.
// https://encore.dev/docs/ts/primitives/services

// equipment service responds to requests with information on BattleTech equipment.
export default new Service("equipment");
