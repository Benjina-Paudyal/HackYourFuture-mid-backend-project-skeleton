/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("order_item", (table) => {
    table.increments("id").primary();

    table.integer("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("customer_order")
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

    table.decimal("price_at_purchase", 10, 2).notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("order_item");
}
