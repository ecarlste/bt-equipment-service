import { api } from "encore.dev/api";
import { TechRating } from "../lib/TechRating";
import { db } from "./database";
import { weapons } from "./schema";
import { CreateWeaponDto, WeaponDto, WeaponResponse } from "./weapon.interface";

export const defaultWeapon = {
  name: "Medium Laser",
  heat: "3",
  damage: "5",
  range: "0/3/6/9",
  ammoPerTon: null,
  weight: 1,
  criticalSlots: 1,
  techRating: TechRating.CommonTech,
} satisfies Omit<WeaponDto, "id">;

export const create = api(
  { expose: true, method: "POST", path: "/weapon" },
  async (data: CreateWeaponDto): Promise<WeaponResponse> => {
    const [weapon] = await db.insert(weapons).values(data).returning();

    return { result: weapon };
  }
);

export const get = api(
  { expose: true, method: "GET", path: "/weapon/:id" },
  async ({ id }: { id: string }): Promise<WeaponResponse> => {
    const resp = {
      result: {
        id,
        ...defaultWeapon,
      },
    } satisfies WeaponResponse;

    return resp;
  }
);

export const list = api(
  { expose: true, method: "GET", path: "/weapon" },
  async (): Promise<WeaponResponse> => {
    const result = await db.select().from(weapons);

    return { result };
  }
);
