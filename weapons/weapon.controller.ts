import { api, APIError } from "encore.dev/api";
import {
  CreateWeaponDto,
  UpdateWeaponDto,
  WeaponResponse,
} from "./weapon.interface";
import WeaponService from "./weapon.service";

export const create = api(
  { expose: true, method: "POST", path: "/weapons" },
  async (data: CreateWeaponDto): Promise<WeaponResponse> => {
    try {
      return await WeaponService.create(data);
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error creating weapon");
    }
  }
);

export const readOne = api(
  { expose: true, method: "GET", path: "/weapons/:id" },
  async ({ id }: { id: string }): Promise<WeaponResponse> => {
    try {
      return await WeaponService.findOne(id);
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error getting weapon by ID");
    }
  }
);

export const read = api(
  { expose: true, method: "GET", path: "/weapons" },
  async (): Promise<WeaponResponse> => {
    try {
      return await WeaponService.find();
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error getting weapons data");
    }
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
    try {
      return await WeaponService.update(id, data);
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error updating weapon");
    }
  }
);

export const destroy = api(
  { expose: true, method: "DELETE", path: "/weapons/:id" },
  async ({ id }: { id: string }): Promise<WeaponResponse> => {
    try {
      return await WeaponService.delete(id);
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error deleting weapon");
    }
  }
);
