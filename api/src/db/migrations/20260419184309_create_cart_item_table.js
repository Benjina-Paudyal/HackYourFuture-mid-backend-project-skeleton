/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("cart_item", (table) => {
    table.increments("id").primary();

    table.integer("cart_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cart")
      .onDelete("CASCADE");

    table.integer("event_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("event")
      .onDelete("CASCADE");

    table.integer("quantity")
      .notNullable()
      .defaultTo(1);

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("cart_item");
}