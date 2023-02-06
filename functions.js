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

// leer archivo
const readFile = (mdFile) => new Promise((resolve, reject) => {
    fs.readFile(mdFile, 'utf-8', (error, file) => {
        if (error) {
            reject(error);
        } else {
            resolve(file);
        }
    });
});

// obtener links, retorna un array de objetos
const getLinks = (mdFile) => new Promise((resolve, reject) => {
    const arrayLinks = [];
    readFile(mdFile)
        .then((file) => {
            const links = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
            let match = links.exec(file);
            while (match !== null) {
                arrayLinks.push({
                    href: match[2],
                    text: match[1],
                    file: mdFile,
                });
                match = links.exec(file)
            }
            resolve(arrayLinks);
        })
        .catch((error) => {
            reject(error);
        })
});

// validar links
const validateLinks = (arrayLinks) => Promise.all(arrayLinks.map((link) => axios.get(link.href)
    .then((response) => {
        return { ...link, status: response.status, ok: response.statusText };
    })
    .catch((error) => {
        if (error.response) {
            return { ...link, status: error.response.status, ok: 'Fail' };
        } else {
            return { ...link, status: 'ERROR: ' + error.message, ok: 'Fail' };
        }
    })));

module.exports = {
    pathExist,
    toAbsolute,
    mdFile,
    getLinks,
    validateLinks,
}