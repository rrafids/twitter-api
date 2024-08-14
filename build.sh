git pull origin master
/root/.nvm/versions/node/v22.6.0/bin/pm2 delete twitter-api
/root/.nvm/versions/node/v22.6.0/bin/pm2 start server.js -n twitter-api
