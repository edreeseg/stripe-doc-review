require("dotenv").config();
const app = require("./api/server");

app.listen("5000", () => console.log("Server listening on port 5000."));
