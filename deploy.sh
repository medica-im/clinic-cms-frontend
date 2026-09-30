#!/usr/bin/env bash
set -euo pipefail

IMAGE="ghcr.io/medica-im/msp-vedene.fr:latest"
ENV_FILE="${1:-.env.production}"
REMOTE_HOST="blog"
REMOTE_DIR="/opt/clinic-cms/production/frontends/msp-vedene.fr"
COMPOSE_FILE="docker-compose-production.yml"

echo "==> Building image with ${ENV_FILE}..."
docker build --build-arg ENV_FILE="${ENV_FILE}" -t "${IMAGE}" .

echo "==> Pushing image..."
docker push "${IMAGE}"

echo "==> Deploying on ${REMOTE_HOST}..."
ssh "${REMOTE_HOST}" "cd ${REMOTE_DIR} && docker pull ${IMAGE} && docker compose -f ${COMPOSE_FILE} up -d"

echo "==> Done."
