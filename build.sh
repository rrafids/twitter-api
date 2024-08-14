git pull origin master
sudo npm install -g pm2
pm2 delete twitter-api
pm2 start server.js -n twitter-api
