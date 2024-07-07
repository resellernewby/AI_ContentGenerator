/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://nighelvadb_owner:CH5dseEvrfX4@ep-tight-bar-a1ent7ez.ap-southeast-1.aws.neon.tech/nighelvadb?sslmode=require',
    }
  };
  