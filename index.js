const {
  pathExist,
  toAbsolute,
  mdFile,
  readFiles,
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
        readFiles(absolutePath); // funcion para leer archivos y obtener links en el archivo
      }
    }

    // validar los links
    // validate:false href: URL encontrada.text: Texto que aparecía dentro del link (<a>).file: Ruta del archivo donde se encontró el link
    // validate:true href: URL encontrada.text: Texto que aparecía dentro del link (<a>).file: Ruta del archivo donde se encontró el link.status: Código de respuesta HTTP.ok: Mensaje fail en caso de fallo u ok en caso de éxito.
  });

}

module.exports = {
  mdLinks
};
