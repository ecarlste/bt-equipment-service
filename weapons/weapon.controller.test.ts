import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { create, readOne, read, destroy, update } from "./weapon.controller";
import { CreateWeaponDto, WeaponDto } from "./weapon.interface";
import { TechRating } from "../lib/TechRating";
import { db } from "./database";
import { weapons } from "./schema";

const defaultTestWeapon: CreateWeaponDto = {
  name: "Test Weapon",
  heat: "3",
  damage: "5",
  range: "0/3/6/9",
  ammoPerTon: null,
  weight: 1,
  criticalSlots: 1,
  techRating: TechRating.CommonTech,
};

describe("weapon", () => {
  beforeAll(async () => {
    await db.delete(weapons);
  });

  afterEach(async () => {
    await db.delete(weapons);
  });

  describe("create", () => {
    it("should return the weapon created with an id", async () => {
      const weaponToCreate: CreateWeaponDto = {
        ...defaultTestWeapon,
        name: "Weapon Create Test",
      };
      const weaponCreated = await create({ data: weaponToCreate });

      const { id } = weaponCreated.result as WeaponDto;
      expect(weaponCreated.result).toMatchObject({
        id,
        ...weaponToCreate,
      });
    });
  });

  describe("readOne", () => {
    it("should return the weapon found by id", async () => {
      const weaponToGet: CreateWeaponDto = {
        ...defaultTestWeapon,
        name: "Weapon Get Test",
      };
      const [weapon] = await db.insert(weapons).values(weaponToGet).returning();

      const weaponFound = await readOne({ id: weapon.id });

      expect(weaponFound.result).toMatchObject(weapon);
    });
  });

  describe("read", () => {
    it("should return all weapons", async () => {
      const weaponsToList: CreateWeaponDto[] = [
        { ...defaultTestWeapon, name: "Weapon List Test 1" },
        { ...defaultTestWeapon, name: "Weapon List Test 2" },
      ];
      await db.insert(weapons).values(weaponsToList).returning();

      const weaponsFound = await read();

      expect(weaponsFound.result).toMatchObject(weaponsToList);
    });
  });

  describe("update", () => {
    it("should return the weapon updated", async () => {
      const [weapon] = await db
        .insert(weapons)
        .values(defaultTestWeapon)
        .returning();
      const updatedData = { name: defaultTestWeapon.name + " Updated" };
      const weaponUpdated = (await update({
        id: weapon.id,
        data: updatedData,
      })) as { result: WeaponDto };

      expect({
        ...weaponUpdated.result,
        updatedAt: undefined,
      }).toMatchObject({
        ...weapon,
        updatedAt: undefined,
        ...updatedData,
      });
    });
  });

  describe("destroy", () => {
    it("should delete the weapon found by id", async () => {
      const [weapon] = await db
        .insert(weapons)
        .values(defaultTestWeapon)
        .returning();

      await destroy({ id: weapon.id });

      const weaponsFound = await read();
      expect(weaponsFound.result).toEqual([]);
    });

    it("should return the weapon deleted", async () => {
      const [weapon] = await db
        .insert(weapons)
        .values(defaultTestWeapon)
        .returning();

      const weaponDeleted = await destroy({ id: weapon.id });

      expect(weaponDeleted.result).toMatchObject(weapon);
    });
  });
});
