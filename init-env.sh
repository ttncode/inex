#!/bin/bash

echo "=================================================="
echo " IN.EX Shop — Environment Initializer"
echo "=================================================="

# Server .env
if [ -d "server" ]; then
  if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    echo "  ✔ Created server/.env from server/.env.example"
  else
    echo "  ℹ server/.env already exists."
  fi
fi

# Client .env
if [ -d "client" ]; then
  if [ ! -f "client/.env" ]; then
    cp client/.env.example client/.env.local
    echo "  ✔ Created client/.env.local from client/.env.example"
  else
    echo "  ℹ client/.env.local already exists."
  fi
fi

echo "--------------------------------------------------"
echo " Done! Fill in the secret values in server/.env"
echo " and client/.env.local before running the app."
echo " Then run: docker compose up -d --build"
