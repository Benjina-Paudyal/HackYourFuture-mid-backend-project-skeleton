/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw(`
    CREATE UNIQUE INDEX unique_active_cart_per_user
    ON cart (user_id)
    WHERE status = 'active' AND user_id IS NOT NULL;
  `);
}

export async function down(knex) {
  await knex.raw(`
    DROP INDEX unique_active_cart_per_user;
  `);
}
