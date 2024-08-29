let express = require("express");
var cors = require('cors');
let app = express();
const bodyParser = require('body-parser');
const syncData = require("./db/syncData");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));  // to support large payloads
app.use(express.json());
app.use(cors());

app.listen(async () => {
    await syncData();
})