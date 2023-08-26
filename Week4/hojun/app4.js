const express = require("express");
const app = express();

app.use(express.json());
app.listen(4000, () => console.log("server on port 4000"));

const routers = require('./routes/router3');
app.use('/', routers);