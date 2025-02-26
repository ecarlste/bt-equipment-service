import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";
import { AuthData, AuthParams } from "./auth.interface";
import { APIError, Gateway } from "encore.dev/api";
import log from "encore.dev/log";

const apiKey = secret("BtMechlabApiKey");
const apiUserId = secret("BtMechlabApiUserId");

export const auth = authHandler(
  async (params: AuthParams): Promise<AuthData> => {
    const token = params.authorization.replace("Bearer ", "");

    if (!token) {
      throw APIError.unauthenticated("no token provided");
    }

    if (token === apiKey()) {
      return {
        userID: apiUserId(),
      };
    } else {
      log.error("Unable to verify API key!");
      throw APIError.unauthenticated("invalid token");
    }
  }
);

export const gateway = new Gateway({ authHandler: auth });
