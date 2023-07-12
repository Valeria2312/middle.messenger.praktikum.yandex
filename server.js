import {fileURLToPath} from "node:url"
const express = require("express");
const path = require('node:path');

// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename);
const app = express();


app.use(express.static(path.resolve(_dirname, "/dist" )));

app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "/dist/index.html"));
});

app.listen(3000);

console.log("server started")