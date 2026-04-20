-- Paginated event listing
SELECT * FROM event
ORDER BY created_at DESC
limit 10 OFFSET 0;

--FOR PAGE 2:
LIMIT 10 OFFSET 10;

-- Cart subtotal
SELECT SUM(ci.quantity * e.price) AS subtotal
FROM cart_item ci
JOIN event e ON e.id = ci.event_id
WHERE ci.cart_id = 1;

-- Order total
SELECT SUM(quantity * price_at_purchase) AS total
FROM order_item
WHERE order_id = 1;

