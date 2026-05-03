export async function seed(knex) {
  await knex("cart").del();

  const user = await knex("app_user").first();

  if (!user) {
    throw new Error("No user found. Run app_user seed first.");
  }

  await knex("cart").insert({
    user_id: user.id,
    status: "active",
  });
}