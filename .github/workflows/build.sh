cd /home/rrafids/twitter-api
git pull origin master
pm2 delete twitter-api
pm2 start server.js -n twitter-api