/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable("event", (table) => {
    table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("app_user")
      .onDelete("SET NULL");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("event", (table) => {
    table.dropColumn("user_id");
  });
}
