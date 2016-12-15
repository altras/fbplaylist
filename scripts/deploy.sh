#!/bin/bash
ssh root@138.68.82.234 &&
cd playlist-app &&
git pull origin develop &&
/bin/bash sh/run-docker.sh &&
exit
