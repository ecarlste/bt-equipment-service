import { db } from "./database";
import { eq } from "drizzle-orm";
import { weapons } from "./schema";
import { CreateWeaponDto, WeaponResponse } from "./weapon.interface";

const WeaponService = {
  create: async (data: CreateWeaponDto): Promise<WeaponResponse> => {
    const [weapon] = await db.insert(weapons).values(data).returning();

    return {
      success: true,
      result: weapon,
    };
  },

  find: async (): Promise<WeaponResponse> => {
    const weaponList = await db.select().from(weapons);

    return {
      success: true,
      result: weaponList,
    };
  },

  findOne: async ({ id }: { id: string }): Promise<WeaponResponse> => {
    const [weapon] = await db
      .select()
      .from(weapons)
      .where(eq(weapons.id, id))
      .limit(1);

    if (!weapon) {
      return {
        success: false,
        message: "Weapon not found",
      };
    }

    return {
      success: true,
      result: weapon,
    };
  },

  delete: async ({ id }: { id: string }): Promise<WeaponResponse> => {
    const [weapon] = await db
      .delete(weapons)
      .where(eq(weapons.id, id))
      .returning();

    if (!weapon) {
      return {
        success: false,
        message: "Weapon not found",
      };
    }

    return {
      success: true,
      result: weapon,
    };
  },
};

export default WeaponService;
