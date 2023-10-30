#!/bin/bash

yarn generate
git add .
git commit -am "update docs"
git push origin master

