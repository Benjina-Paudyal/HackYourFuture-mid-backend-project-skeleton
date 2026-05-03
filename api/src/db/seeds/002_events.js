/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {
  await knex("event").del();

  const user = await knex("app_user").first();

  if (!user) {
    throw new Error("No user found. Seed app_user first.");
  }

  await knex("event").insert([
    {
      price: 100,
      currency: "DKK",
      title: "Copenhagen Coffee Crawl",
      description:
        "A relaxed Saturday walk between 4 specialty cafés. Includes tasting notes and small pastries.",
      user_id: user.id,
    },
    {
      price: 150,
      currency: "DKK",
      title: "After-Work Board Games Night",
      description:
        "A cozy evening of board games, fun challenges, and social vibes.",
      user_id: user.id,
    },
    {
      price: 250,
      currency: "DKK",
      title: "Beginner Pasta Workshop",
      description:
        "Learn to make fresh pasta from scratch with simple ingredients and techniques.",
      user_id: user.id,
    },
    {
      price: 0,
      currency: "DKK",
      title: "Sunday Park Run & Stretch",
      description:
        "A relaxed community run followed by guided stretching. All levels welcome.",
      user_id: user.id,
    },
    {
      price: 180,
      currency: "DKK",
      title: "Photography Walk: City Lights",
      description:
        "Evening walk focused on street photography, light, and composition tips.",
      user_id: user.id,
    },
  ]);
}