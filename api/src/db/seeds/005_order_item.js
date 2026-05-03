export async function seed(knex) {
  await knex("order_item").del();

  const order = await knex("customer_order").first();
  const events = await knex("event").limit(2);

  if (!order) {
    throw new Error("No customer_order found. Run order seed first.");
  }

  if (events.length < 2) {
    throw new Error("Not enough events found. Need at least 2 events.");
  }

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