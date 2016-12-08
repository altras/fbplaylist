#!/bin/bash
sudo docker stop $(sudo docker ps -a -q) && sudo docker rm $(sudo docker ps -a -q) && sudo docker rmi playlistapp && sudo docker build -t playlistapp . && sudo docker run --name playlistapp-nginx -v /nginx-logs:/var/log/nginx -p 80:80 -d playlistapp
