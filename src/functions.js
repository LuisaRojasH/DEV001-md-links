const fs = require('fs');
const path = require('path');

// existe la ruta?
const pathExist = (route) => fs.existsSync(route);

module.exports = {
    pathExist,
}