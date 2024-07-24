import type { Knex } from "knex";

import {configObj} from "./src/Config";
// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
   ...configObj,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    ...configObj,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    ...configObj,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

module.exports = config;
