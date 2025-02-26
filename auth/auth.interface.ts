import { Header } from "encore.dev/api";

/**
 * Parameters required for authentication
 */
export interface AuthParams {
  authorization: Header<"Authorization">;
}

/**
 * Data returned after successful authentication
 */
export interface AuthData {
  userID: string;
}
