import { db } from "./database";
import { eq } from "drizzle-orm";
import { weapons } from "./schema";
import {
  CreateWeaponDto,
  UpdateWeaponDto,
  WeaponResponse,
} from "./weapon.interface";

const WeaponService = {
  create: async (data: CreateWeaponDto): Promise<WeaponResponse> => {
    const [weapon] = await db.insert(weapons).values(data).returning();

    return {
      success: true,
      result: weapon,
    };
  },

  createMany: async (data: CreateWeaponDto[]): Promise<WeaponResponse> => {
    const weaponsCreated = await db.insert(weapons).values(data).returning();

    return {
      success: true,
      result: weaponsCreated,
    };
  },

  find: async (): Promise<WeaponResponse> => {
    const weaponList = await db.select().from(weapons);

    return {
      success: true,
      result: weaponList,
    };
  },

  findOne: async (id: string): Promise<WeaponResponse> => {
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

  update: async (
    id: string,
    data: UpdateWeaponDto
  ): Promise<WeaponResponse> => {
    const [updateWeapon] = await db
      .update(weapons)
      .set(data)
      .where(eq(weapons.id, id))
      .returning();

    if (!updateWeapon) {
      return {
        success: false,
        message: "Weapon not found",
      };
    }

    return {
      success: true,
      result: updateWeapon,
    };
  },

  delete: async (id: string): Promise<WeaponResponse> => {
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
