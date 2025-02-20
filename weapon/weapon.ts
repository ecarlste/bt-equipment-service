import { api } from "encore.dev/api";
import { eq } from "drizzle-orm";
import { db } from "./database";
import { weapons } from "./schema";
import { CreateWeaponDto, WeaponResponse } from "./weapon.interface";

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
    const [weapon] = await db
      .select()
      .from(weapons)
      .where(eq(weapons.id, id))
      .limit(1);

    return { result: weapon };
  }
);

export const list = api(
  { expose: true, method: "GET", path: "/weapon" },
  async (): Promise<WeaponResponse> => {
    const weaponList = await db.select().from(weapons);

    return { result: weaponList };
  }
);

export const remove = api(
  { expose: true, method: "DELETE", path: "/weapon/:id" },
  async ({ id }: { id: string }): Promise<WeaponResponse> => {
    const [weapon] = await db
      .delete(weapons)
      .where(eq(weapons.id, id))
      .returning();

    return { result: weapon };
  }
);
