/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://mockvani_owner:k8Zv1tphnAFY@ep-noisy-violet-a5n0ns6p.us-east-2.aws.neon.tech/mockvani?sslmode=require',
    }
  };