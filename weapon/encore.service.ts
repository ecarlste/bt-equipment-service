import { Service } from "encore.dev/service";

// Encore will consider this directory and all its subdirectories as part of the "weapon" service.
// https://encore.dev/docs/ts/primitives/services

// weapon service responds to requests with information on BattleTech weapons.
export default new Service("weapon");
