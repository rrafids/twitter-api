git pull origin master
sudo npm install -g pm2
sudo apt update
sudo apt install -y nodejs npm
pm2 delete twitter-api
pm2 start server.js -n twitter-api
