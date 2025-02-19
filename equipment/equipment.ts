import { api } from "encore.dev/api";

export const get = api(
  { expose: true, method: "GET", path: "/equipment/:id" },
  async ({ id }: { id: string }): Promise<Response> => {
    const msg = `Equipment with id: ${id}`;
    return { message: msg };
  }
);

interface Response {
  message: string;
}
