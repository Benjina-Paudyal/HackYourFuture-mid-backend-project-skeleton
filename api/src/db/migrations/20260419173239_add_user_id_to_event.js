/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable("event", (table) => {
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("app_user")
      .onDelete("CASCADE")
      .index();
  });
}

export async function down(knex) {
  await knex.schema.alterTable("event", (table) => {
    table.dropColumn("user_id");
  });
}
