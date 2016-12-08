#!/bin/bash
sudo docker load -i docker-image/playlist-app.tar && sudo docker run --name playlistapp-nginx -v /nginx-logs:/var/log/nginx -p 80:80 -d playlistappg
