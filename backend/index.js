const server = require('./api/server.js');

const port = 5000;
server.listen(port, () => {
  console.log(` *** Good stuff over on Port ${port} *** `);
});