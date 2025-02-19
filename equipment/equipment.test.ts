import { describe, expect, test } from "vitest";
import { get } from "./equipment";

describe("get", () => {
  test("should combine string with parameter value", async () => {
    const resp = await get({ id: "fake-equipment-id" });
    expect(resp.message).toBe("Equipment with id: fake-equipment-id");
  });
});
