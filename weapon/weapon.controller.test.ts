import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { create, readOne, read, destroy } from "./weapon.controller";
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

const weaponToGet: CreateWeaponDto = {
  ...defaultTestWeapon,
  name: "Weapon Get Test",
};

const weaponToCreate: CreateWeaponDto = {
  ...defaultTestWeapon,
  name: "Weapon Create Test",
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
      const weaponCreated = await create(weaponToCreate);

      const { id } = weaponCreated.result as WeaponDto;
      expect(weaponCreated.result).toMatchObject({
        id,
        ...weaponToCreate,
      });
    });
  });

  describe("get", () => {
    it("should return the weapon found by id", async () => {
      const [weapon] = await db.insert(weapons).values(weaponToGet).returning();

      const weaponFound = await readOne({ id: weapon.id });

      expect(weaponFound.result).toMatchObject(weapon);
    });
  });

  describe("list", () => {
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

  describe("delete", () => {
    it("should delete the weapon found by id", async () => {
      const [weapon] = await db.insert(weapons).values(weaponToGet).returning();

      await destroy({ id: weapon.id });

      const weaponsFound = await read();
      expect(weaponsFound.result).toEqual([]);
    });

    it("should return the weapon deleted", async () => {
      const [weapon] = await db.insert(weapons).values(weaponToGet).returning();

      const weaponDeleted = await destroy({ id: weapon.id });

      expect(weaponDeleted.result).toMatchObject(weapon);
    });
  });
});
