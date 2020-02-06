const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3003;
const ipAddress = 'localhost'
//This is almost the same ass using app.listen(port) and it might matter a little but if you wanna reuse this http server later
const server = http.createServer(app);

console.log(`Listening on port ${port} and IP: ${ipAddress}`)
server.listen(port);
