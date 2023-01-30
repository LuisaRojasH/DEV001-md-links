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
        console.log(pathExist(path));
       const absolutePath = toAbsolute(path); // funcion convierte a absoluta
       if (!mdFile(absolutePath)) {
        reject('el archivo no es .md') // rechaza si no es un archivo .md
       } else {
        console.log(mdFile(absolutePath))
        readFiles(absolutePath); // funcion que lee el archivo
       }
      
    }

    
    // convertir a ruta absoluta
    // identificar si la ruta es archivo o directorio
    // si es un directorio devuelve un arreglo con los archivos md si los tiene 
    // si es un archivo devuelve un arreglo con el archivo md
    // verificar si hay links en los archivos md
    // validar los links
    // validate:false href: URL encontrada.text: Texto que aparecía dentro del link (<a>).file: Ruta del archivo donde se encontró el link
    // validate:true href: URL encontrada.text: Texto que aparecía dentro del link (<a>).file: Ruta del archivo donde se encontró el link.status: Código de respuesta HTTP.ok: Mensaje fail en caso de fallo u ok en caso de éxito.
  });
 
}

module.exports = {
  mdLinks
};
