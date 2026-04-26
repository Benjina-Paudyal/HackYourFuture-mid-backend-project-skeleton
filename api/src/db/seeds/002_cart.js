
export async function seed(knex) {
  await knex("cart").del();

  const user = await knex("app_user").first();

  await knex("cart").insert({
    user_id: user.id,
    status: "active",
  });
}