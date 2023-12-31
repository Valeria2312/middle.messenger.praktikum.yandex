// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.static("./dist"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, () => {
    console.log(`Server start on ${PORT} port`);
});

console.log("server started");
