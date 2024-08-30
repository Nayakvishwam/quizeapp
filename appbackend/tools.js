const fs = require('fs');

const createNewFolder = (dirPath) => {
    // Check if the directory already exists
    if (!fs.existsSync(dirPath)) {
        // Create the directory
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created at: ${dirPath}`);
    } else {
        console.log('Directory already exists.');
    }
}
module.exports = {
    createNewFolder
}