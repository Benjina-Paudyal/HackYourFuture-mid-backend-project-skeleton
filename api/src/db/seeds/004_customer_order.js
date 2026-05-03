export async function seed(knex) {
  await knex("customer_order").del();

  const user = await knex("app_user").first();
  const cart = await knex("cart").first();

  if (!user) {
    throw new Error("No user found. Run app_user seed first.");
  }

  if (!cart) {
    throw new Error("No cart found. Run cart seed first.");
  }

  await knex("customer_order").insert({
    user_id: user.id,
    cart_id: cart.id,
    total_price: 200,
    currency: "DKK",
  });
}