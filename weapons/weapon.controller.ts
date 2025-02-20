import { api } from "encore.dev/api";
import {
  CreateWeaponDto,
  UpdateWeaponDto,
  WeaponResponse,
} from "./weapon.interface";
import WeaponService from "./weapon.service";

export const create = api(
  { expose: true, method: "POST", path: "/weapons" },
  async (data: CreateWeaponDto): Promise<WeaponResponse> => {
    return WeaponService.create(data);
  }
);

export const readOne = api(
  { expose: true, method: "GET", path: "/weapons/:id" },
  async ({ id }: { id: string }): Promise<WeaponResponse> => {
    return WeaponService.findOne(id);
  }
);

export const read = api(
  { expose: true, method: "GET", path: "/weapons" },
  async (): Promise<WeaponResponse> => {
    return WeaponService.find();
  }
);

export const update = api(
  { expose: true, method: "PUT", path: "/weapons/:id" },
  async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateWeaponDto;
  }): Promise<WeaponResponse> => {
    return WeaponService.update(id, data);
  }
);

export const destroy = api(
  { expose: true, method: "DELETE", path: "/weapons/:id" },
  async ({ id }: { id: string }): Promise<WeaponResponse> => {
    return WeaponService.delete(id);
  }
);
