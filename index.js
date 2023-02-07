const {
  pathExist,
  toAbsolute,
  mdFile,
  validateLinks,
  getLinks,
} = require('./functions')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // la ruta existe?
    if (!pathExist(path)) {
      reject('la ruta no existe');  // si no existe la ruta rechaza la promesa
    } else {
      const absolutePath = toAbsolute(path); // funcion convierte a absoluta
      if (!mdFile(absolutePath)) {
        reject('el archivo no es .md') // rechaza si no es un archivo .md
      } else {
        // funcion para leer archivos y obtener links en el archivo
        getLinks(absolutePath).then((arrayLinks) => {
          if (arrayLinks.length === 0) {
            reject('no contiene links');
          } else {
            if (options.validate === false) {
              resolve(arrayLinks)
            } else {
              // funcion para validar links
              validateLinks(arrayLinks).then((result) => {
                resolve(result)
              })
            }
          };
        })

      };
    }
  })
}

module.exports = {
  mdLinks
};
