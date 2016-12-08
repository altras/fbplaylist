#!/bin/bash
npm run build.prod && sudo docker rmi playlistapp && sudo docker build -t playlistapp . && sudo docker save -o docker-image/playlist-app.tar playlistapp
