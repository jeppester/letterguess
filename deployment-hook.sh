#!/bin/sh
git fetch
git reset --hard origin/master
yarn install
yarn build
