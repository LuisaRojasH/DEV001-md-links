const { mdLinks } = require('../index.js');
const {
  pathExist,
  toAbsolute,
  mdFile,
  readFile,
  getLinks,
  getStats,
  getStatsAndValidate, } = require('../functions.js');
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
    return mdLinks(path)
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
      }
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
      }
    ]

    mdLinks(path, { validate: true }).then((result) => {
      expect(result).toStrictEqual(validate)
    })
      .catch(() => { });
  });
});

const absolutePath = 'C:\Users\LABORATORIA\OneDrive\Escritorio\Luisa\Laboratoria\DEV001-md-links\prueba.md'

describe('pathExist', () => {
  it('debe ser una funcion', () => {
    expect(typeof pathExist).toBe('function');
  });
  it('debe retorna true si el path existe', () => {
    expect(pathExist('./prueba.md')).toBe(true);
  });
  it('debe retorna false si el path no existe', () => {
    expect(pathExist('./noexiste.md')).toBe(false);
  });
});

describe('toAbsolute', () => {
  it('debe ser una funcion', () => {
    expect(typeof toAbsolute).toBe('function');
  });
  it('debe si el path es absoluto retorna true', () => {
    expect(toAbsolute(absolutePath)).toBeTruthy();
  });
  it('debe si el path es relativo retorna el path absoluto', () => {
    expect(toAbsolute('./prueba.md')).toBe('C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md');
  });
});

describe('mdFile', () => {
  it('debe ser una funcion', () => {
    expect(typeof mdFile).toBe('function');
  });
  it('debe retorna true si el archivo es .md', () => {
    expect(mdFile('./prueba.md')).toBe(true);
  });
  it('debe retorna false si el archivo no es .md', () => {
    expect(mdFile('./thumb.png')).toBe(false);
  });
});

describe('readFile', () => {
  it('debe ser una funcion', () => {
    expect(typeof readFile).toBe('function');
  });

});

describe('getLinks', () => {
  it('debe ser una funcion', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('debe devolver una promesa', () => {
    getLinks(absolutePath).then(() => {
      expect(getLinks(absolutePath)).toBe(typeof Promise);
    })
      .catch(() => { })
  });
});
it('debe retornar array con objetos {href,text,file}', () => {
  const file = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md'
    },
  ]
  getLinks(absolutePath).then((result) => {
    expect(result).toEqual(file);
  })
    .catch(() => { })
});

const links = [
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
];

describe('getStats', () => {
  it('debe ser una funcion', () => {
    expect(typeof getStats).toBe('function');
  });
  it('debe retornar objeto con total y unique', () => {
    const stats = { Total: 2, Unique: 2 };
    expect(getStats(links)).toEqual(stats);
  });
});

describe('getStatsAndValidate', () => {
  it('debe ser una funcion', () => {
    expect(typeof getStatsAndValidate).toBe('function');
  });
  it('debe retornar objeto con total, unique y broken', () => {
    const stats = { Total: 2, Unique: 2, Broken: 1 };
    expect(getStatsAndValidate(links)).toEqual(stats);
  });
});

