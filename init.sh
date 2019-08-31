#!/bin/bash
echo 'Starting up json-server'

cd server
npm install
npm start &

sleep 1s

echo 'Starting up app'
cd ../
# execute React app
npm install
npm start