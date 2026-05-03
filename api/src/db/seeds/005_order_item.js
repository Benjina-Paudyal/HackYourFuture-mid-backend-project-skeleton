/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  await knex("order_item").del();

  // get existing data
  const order = await knex("customer_order").first();
  const events = await knex("event").limit(2);

  await knex("order_item").insert([
    {
      order_id: order.id,
      event_id: events[0].id,
      quantity: 2,
      price_at_purchase: events[0].price,
    },
    {
      order_id: order.id,
      event_id: events[1].id,
      quantity: 1,
      price_at_purchase: events[1].price,
    },
  ]);
}