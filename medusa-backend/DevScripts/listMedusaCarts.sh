#!/usr/bin/env bash
set -euo pipefail

export PGPASSWORD

SQL="
SELECT
  c.id              AS cart_id,
  c.email,
  c.created_at,
  i.id              AS item_id,
  i.title           AS item_title,
  i.quantity,
  i.product_id,
  i.product_title,
  i.variant_id
FROM cart c
LEFT JOIN cart_line_item i ON i.cart_id = c.id
WHERE c.deleted_at IS NULL
ORDER BY c.created_at DESC, i.created_at ASC;
"

echo "here"
echo SQL 

#export PGHOST=70.34.196.51 PGPORT=5432 PGUSER=admin PGDB=default_database PGPASSWORD='7Nt98abmL3K'

#docker run --rm -i postgres:16-alpine psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDB" -c "SELECT 1;"
docker exec -it postgres psql -U admin -d default_database -c "$SQL"
