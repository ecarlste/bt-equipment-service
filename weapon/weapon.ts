import { api } from "encore.dev/api";
import { TechRating } from "../lib/TechRating";

interface WeaponResponse {
  id: string;
  name: string;
  heat: string;
  damage: string;
  range: string;
  ammoPerTon?: number;
  weight: number;
  criticalSlots: number;
  techRating: TechRating;
}

export const defaultWeapon = {
  name: "Medium Laser",
  heat: "3",
  damage: "5",
  range: "0/3/6/9",
  weight: 1,
  criticalSlots: 1,
  techRating: TechRating.CommonTech,
} satisfies Omit<WeaponResponse, "id">;

export const get = api(
  { expose: true, method: "GET", path: "/weapon/:id" },
  async ({ id }: { id: string }): Promise<WeaponResponse> => {
    const resp = {
      id,
      ...defaultWeapon,
    } satisfies WeaponResponse;

    return resp;
  }
);
