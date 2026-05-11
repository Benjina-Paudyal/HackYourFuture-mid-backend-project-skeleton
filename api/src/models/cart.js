// import db from "#configs/database.js";

// const TABLE = "cart";
// const ITEM_TABLE = "cart_item";

// export async function getOrCreateCart({ userId, cartToken }) {
//     let query = db(TABLE);
    
//     if (userId) {
//         query = query.where({ user_id: userId });
//     } else {
//         query = query.where({ cart_token: cartToken });
//     }

//     let cart = await query.first();

//     if (!cart) {
//         [cart] = await db(TABLE)
//             .insert({ 
//                 user_id: userId || null, 
//                 cart_token: userId ? null : cartToken,
//                 status: "active" 
//             })
//             .returning("*");
//     }
//     return cart;
// }

// export async function listCartItems(cartId) {
//     return db(`${ITEM_TABLE} as ci`)
//         .join("event as e", "ci.event_id", "e.id")
//         .where("ci.cart_id", cartId)
//         .select(
//             "ci.id",
//             "ci.quantity",
//             "e.id as event_id",
//             "e.title",
//             "e.price",
//             "e.currency"
//         );
// }

// export async function addItem(cartId, eventId, quantity) {
//     const existing = await db(ITEM_TABLE)
//         .where({ cart_id: cartId, event_id: eventId })
//         .first();

//     if (existing) {
//         return db(ITEM_TABLE)
//             .where({ id: existing.id })
//             .update({ quantity: existing.quantity + quantity })
//             .returning("*");
//     }

//     return db(ITEM_TABLE)
//         .insert({ cart_id: cartId, event_id: eventId, quantity })
//         .returning("*");
// }

// export async function updateItemQuantity(cartId, itemId, quantity) {
//     return db(ITEM_TABLE)
//         .where({ id: itemId, cart_id: cartId })
//         .update({ quantity })
//         .returning("*");
// }

// export async function removeItem(cartId, itemId) {
//     return db(ITEM_TABLE)
//         .where({ id: itemId, cart_id: cartId })
//         .del();
// }