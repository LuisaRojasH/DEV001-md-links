const fs = require('fs');
const path = require('path');

// existe la ruta?
const pathExist = (route) => fs.existsSync(route);

// la ruta es absoluta? si no convertir a absoluta
const toAbsolute = (route) => {
    if (!path.isAbsolute(route)) {
        return path.resolve(route)
    } else {
        return route
    }
};

// es un archivo md?
const mdFile = (absolutePath) => {
    if (path.extname(absolutePath) === '.md') {
        return true
    } else {
        return false
    }
}

// leer archivo
const readFiles = (fileMd) => {
    new Promise((resolve, reject) => {
        fs.readFile(fileMd, 'utf-8', function (error, data) {
            if (error) {
                reject('Error');
            } else {
                resolve(data);
            }
        });
    });
};

// obtener links
const links = (fileMd) => {
    new Promise ((resolve, reject) => {
const arrayLinks = [];

    })
}

module.exports = {
    pathExist,
    toAbsolute,
    mdFile,
    readFiles,
}