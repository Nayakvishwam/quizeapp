const fs = require('fs');

function uploadFiles(filePath,data) {
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log("Write file successfully");
    })
};
module.exports = {
    uploadFiles
}