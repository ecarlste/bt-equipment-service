import { describe, expect, test } from "vitest";
import { defaultWeapon, get } from "./weapon";

describe("get", () => {
  test("should combine string with parameter value", async () => {
    const resp = await get({ id: "fake-weapon-id" });

    expect(resp).toStrictEqual({
      id: "fake-weapon-id",
      ...defaultWeapon,
    });
  });
});
