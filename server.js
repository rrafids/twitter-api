const app = require('./src/app');
const PORT = 3001;

app.listen(PORT, function () {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
