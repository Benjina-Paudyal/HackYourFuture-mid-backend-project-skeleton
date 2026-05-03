/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("customer_order", (table) => {
    table.increments("id").primary();

    table.integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("app_user")
      .onDelete("SET NULL");

    table.integer("cart_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("cart")
      .onDelete("SET NULL");

    table.decimal("total_price", 10, 2).notNullable();

    table.string("currency", 3).notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("customer_order");
}
