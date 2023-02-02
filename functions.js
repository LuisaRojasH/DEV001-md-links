const fs = require('fs');
const path = require('path');
const axios = require('axios');

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

// leer archivo y obtener links, retorna un array de objetos
const readFiles = (mdFile) => {
    new Promise((resolve, reject) => {
        fs.readFile(mdFile, 'utf-8', (error, data) => {
            if (error) {
                reject(error);                
            } else {
                let arrayLinks = [];
                const links = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
            let match = links.exec(data);
            while (match !== null) {
                arrayLinks.push({
                    href: match[2],
                    text: match[1],
                    file: mdFile,
                });
                match = links.exec(data)
            }
            resolve(arrayLinks);
            console.log('links en archivo md', arrayLinks);
            }
        })
    })
}

module.exports = {
    pathExist,
    toAbsolute,
    mdFile,
    readFiles,
}