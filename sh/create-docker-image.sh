#!/bin/bash
npm run build.prod && sudo docker stop $(sudo docker ps -a -q) && sudo docker rm $(sudo docker ps -a -q) && sudo docker rmi playlistapp && sudo docker build -t playlistapp . && sudo docker save -o docker-image/playlist-app.tar playlistapp
