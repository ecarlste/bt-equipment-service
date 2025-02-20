import { APIError } from "encore.dev/api";

export const withErrorHandling = <T, Args extends any[]>(
  operation: string,
  fn: (...args: Args) => Promise<T>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw APIError.aborted(
        `Error ${operation}: ${message}`,
        error instanceof Error ? error : undefined
      );
    }
  };
};
