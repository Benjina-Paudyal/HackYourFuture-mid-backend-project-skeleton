import knex from "knex";
import { createKnexConfig } from "../configs/knex-config.js";

const config = createKnexConfig();

const db = knex(config);

export default db;