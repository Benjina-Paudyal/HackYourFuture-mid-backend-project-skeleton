/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("cart", (table) => {
    table.increments("id").primary();

    table.integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("app_user")
      .onDelete("SET NULL");

    table.enu("status", ["active", "ordered"])
      .notNullable()
      .defaultTo("active");

    table.timestamps(true, true);

    table.index(["user_id", "status"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("cart");
}