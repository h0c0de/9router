#!/bin/bash
set -e

echo "=== 9Router Full Fix & Test ==="
echo "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"

cd ~/projects/9router

echo ""
echo "[1/8] Backup database..."
cp -f .9router/db/data.sqlite .9router/db/backups/data.sqlite.$(date +%Y%m%d-%H%M%S)

echo "[2/8] Stop existing containers..."
docker compose down 2>/dev/null || true

echo "[3/8] Start 9router..."
docker compose up -d

echo "[4/8] Wait for healthcheck (45s)..."
sleep 45

echo "[5/8] Check container status..."
docker ps --filter name=9router --format "{{.Names}}: {{.Status}}"

echo ""
echo "[6/8] Test internal API (from container)..."
docker exec 9router wget -q -O- http://127.0.0.1:20128/v1/models 2>/dev/null | jq -r '.data | length' || echo "FAIL"

echo ""
echo "[7/8] Test external access (requires API key)..."
# CLI token test
MACHINE_ID=$(cat .9router/machine-id)
MODEL_COUNT=$(curl -s http://127.0.0.1:20128/v1/models -H "x-9r-cli-token: $MACHINE_ID" | jq -r '.data | length // 0')
echo "Models via CLI token: $MODEL_COUNT"

echo ""
echo "[8/8] Run test suite..."
cd tests
npm test 2>&1 | tail -50

echo ""
echo "=== Fix & Test Complete ==="
