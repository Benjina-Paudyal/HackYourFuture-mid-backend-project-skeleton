export async function seed(knex) {
  await knex("customer_order").del();

  const user = await knex("app_user").first();
  const cart = await knex("cart").first();

  await knex("customer_order").insert({
    user_id: user.id,
    cart_id: cart.id,
    total_price: 200,
    currency: "DKK",
  });
}