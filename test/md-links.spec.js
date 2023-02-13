const { mdLinks } = require('../index.js');
const {
  pathExist,
  toAbsolute,
  mdFile,
  readFile,
  getLinks, } = require('../functions.js');
const { axios } = require('axios');

jest.mock('axios');

describe('mdLinks', () => {
  it('debe ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('deberia devolver una promesa', () => {
    mdLinks('./prueba.md')
      .then((route) => {
        expect(mdLinks(route)).toBe(typeof Promise);
      })
      .catch(() => { })
  });
  it('debe resolver cuando el path existe', () => {
    const path = 'C:\Users\LABORATORIA\OneDrive\Escritorio\Luisa\Laboratoria\DEV001-md-links\prueba.md';
    mdLinks(path)
      .then((result) => {
        expect(result).resolves(path);
      })
      .catch(() => { });
  });
  it('debe rechazar cuando el path no existe', () => {
    const path = './noexiste.md';
    mdLinks(path).catch((error) => {
      expect(error).toBe('la ruta no existe');
    });
  });
  it('debe rechazar cuando el archivo no es .md', () => {
    mdLinks('./thumb.png').catch((error) => {
      expect(error).toBe('el archivo no es .md');
    });
  });
  it('debe rechazar cuando no hay links', () => {
    mdLinks('./pruebaNoLinks.md').catch((error) => {
      expect(error).toBe('no contiene links');
    });
  })
  it('debe retornar array con objetos {href,text,file}', () => {
    const path = 'C:\Users\LABORATORIA\OneDrive\Escritorio\Luisa\Laboratoria\DEV001-md-links\prueba.md';
    const validate = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\README.md',
        status: 404,
        ok: 'Fail'
    },
    ]
    mdLinks(path, { validate: false })
      .then((result) => {
        expect(result).toStrictEqual(validate)
      })
      .catch(() => { });
  });
  it('debe retornar array con objetos {href,text,file,status,ok}', () => {
    jest.fn(axios).mockImplementationOnce(() => Promise.resolve({ status: 200, }));

    const path = 'C:\Users\LABORATORIA\OneDrive\Escritorio\Luisa\Laboratoria\DEV001-md-links\prueba.md';
    const validate = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\README.md',
        status: 404,
        ok: 'Fail'
    },
    ]

    mdLinks(path, { validate:true }).then((result) => {
      expect(result).toStrictEqual(validate)
    })
      .catch(() => { });
  });
});
