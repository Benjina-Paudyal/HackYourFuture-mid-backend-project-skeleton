export async function seed(knex) {
  await knex("app_user").del();

  await knex("app_user").insert([
    {
      name: "Test User",
      email: "test@example.com",
      password: "Passw0rd",
    },
  ]);
}