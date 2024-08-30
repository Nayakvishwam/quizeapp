let express = require("express");
var cors = require('cors');
let app = express();
const bodyParser = require('body-parser');
const syncData = require("./db/syncData");
const { buildEnv, port } = require("./utilities");
const { router } = require("./routes/routes");
const os = require('os');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));  // to support large payloads
app.use(express.json());
app.use(cors());
app.use('/api', router);
function getNetworkIP() {
    const networkInterfaces = os.networkInterfaces();

    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];

        for (const iface of interfaces) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }

    return null;
};
let ip = getNetworkIP();
app.listen(port, async () => {
    await buildEnv();
    await syncData();
})