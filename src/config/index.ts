import merge from "lodash/merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.STAGE = process.env.STAGE || "local";

let envConfig;

if (process.env.STAGE === "production") {
  envConfig = require("./production").default;
} else if (process.env.STAGE === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

process.env.POSTGRES_PORT = envConfig.postgresPort || process.env.POSTGRES_PORT;

export default merge(
  {
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
