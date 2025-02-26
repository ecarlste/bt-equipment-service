import { api } from "encore.dev/api";
import {
  ReadOneWeaponRequest,
  WeaponResponse,
  UpdateWeaponRequest,
  DestroyWeaponRequest,
  CreateWeaponRequest,
  CreateManyWeaponsRequest,
} from "./weapon.interface";
import WeaponService from "./weapon.service";
import { withErrorHandling } from "../lib/error-handling";

export const create = api<CreateWeaponRequest, WeaponResponse>(
  { expose: true, auth: true, method: "POST", path: "/weapons" },
  withErrorHandling("creating weapon", async (req) => {
    return await WeaponService.create(req.data);
  })
);

export const createMany = api<CreateManyWeaponsRequest, WeaponResponse>(
  { expose: true, auth: true, method: "POST", path: "/weapons/many" },
  withErrorHandling("creating many weapons", async (req) => {
    return await WeaponService.createMany(req.data);
  })
);

export const readOne = api<ReadOneWeaponRequest, WeaponResponse>(
  { expose: true, auth: true, method: "GET", path: "/weapons/:id" },
  withErrorHandling("getting weapon by ID", async (req) => {
    return await WeaponService.findOne(req.id);
  })
);

export const read = api<void, WeaponResponse>(
  { expose: true, auth: true, method: "GET", path: "/weapons" },
  withErrorHandling("getting weapons data", async () => {
    return await WeaponService.find();
  })
);

export const update = api<UpdateWeaponRequest, WeaponResponse>(
  { expose: true, auth: true, method: "PUT", path: "/weapons/:id" },
  withErrorHandling("updating weapon", async (req) => {
    return await WeaponService.update(req.id, req.data);
  })
);

export const destroy = api<DestroyWeaponRequest, WeaponResponse>(
  { expose: true, auth: true, method: "DELETE", path: "/weapons/:id" },
  withErrorHandling("deleting weapon", async (req) => {
    return await WeaponService.delete(req.id);
  })
);
