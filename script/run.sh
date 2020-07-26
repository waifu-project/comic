#!/bin/bash

# create by d1y<chenhonzhou@gmail.com>

if [ "$1" = "" ]; then
  echo "请传递tag标签"
  exit
fi

node changeVersion.js $1

cd ..
git add .
git commit -m "add tag $1"
git push origin master

git tag $1
git push origin --tags