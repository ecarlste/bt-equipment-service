import { APIError } from "encore.dev/api";

export const withErrorHandling = <T>(
  operation: string,
  fn: (...args: any[]) => Promise<T>
): ((...args: any[]) => Promise<T>) => {
  return async (...args: any[]): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw APIError.aborted(`Error ${operation}: ${message}`);
    }
  };
};
