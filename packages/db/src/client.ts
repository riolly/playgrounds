import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// eslint-disable-next-line no-restricted-properties
const postgresUrl = process.env.POSTGRES_URL;
if (!postgresUrl) {
  throw new Error("POSTGRES_URL is not defined");
}

const sql = neon(postgresUrl);

export const db = drizzle(sql, { schema });
