#!/usr/bin/env bash

npm install
bower install
gulp clean
gulp --type production
npm start