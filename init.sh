#!/bin/bash

# Execute json-server
npm install
echo 'Starting up json-server'
npm run serve &

sleep 3s

echo 'Starting up app'
# Execute React app
npm start