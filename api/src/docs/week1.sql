-- Get all items
SELECT * FROM event;

-- Get item by ID
SELECT * FROM event
WHERE id = 1;

-- Join user + events
SELECT 
  e.id, e.title, e.price, e.currency, u.name AS user_name
FROM event e
JOIN app_user u ON e.user_id = u.id;

-- total event count
SELECT COUNT(*) FROM event;