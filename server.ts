const { fileURLToPath } = require('url');
const express = require('express');
const path = require('path');

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const app = express();


app.use(express.static(path.resolve(_dirname, "/dist" )));

app.get("/", (_req: any, res: { sendFile: (arg0: any) => void; }) => {
    res.sendFile(path.join(_dirname, "/dist/index.html"));
});

app.listen(3000);

console.log("server started")
