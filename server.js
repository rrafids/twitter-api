const app = require('./src/app');
const PORT = 3001;

// TODO: integrate with socket.io
// var io = require('socket.io')(app);

app.listen(PORT, function () {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
