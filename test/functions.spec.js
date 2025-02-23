const {
    pathExist,
    toAbsolute,
    mdFile,
    readFile,
    getLinks,
    getStats,
    getStatsAndValidate, } = require('../functions.js');
    
const absolutePath = 'C:\Users\LABORATORIA\OneDrive\Escritorio\Luisa\Laboratoria\DEV001-md-links\prueba.md'

describe('pathExist', () => {
  it('debe ser una funcion', () => {
    expect(typeof pathExist).toBe('function');
  });
  it('debe retorna true si el path existe', () => {
    pathExist('./prueba.md')
    expect(pathExist('./prueba.md')).toBe(true);
  });
  it('debe retorna false si el path no existe', () => {
    pathExist('./noexiste.md')
    expect(pathExist('./noexiste.md')).toBe(false);
  });
});

describe('toAbsolute', () => {
  it('debe ser una funcion', () => {
    expect(typeof toAbsolute).toBe('function');
  });
  it('debe retornar true si el path es absoluto', () => {
    expect(toAbsolute(absolutePath)).toBeTruthy();
  });
  it('debe retorna el path absoluto si el path es relativo', () => {
    expect(toAbsolute('./prueba.md')).toBe('C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md');
  });
  it('debe devolver el mismo path si es absoluto', () => {
    expect(toAbsolute('C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md')).toBe('C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md');
  })
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
  it('debe devolver una promesa', () => {
    readFile('./prueba.md').then((result) => {
      expect(readFile('./prueba.md').toBe(typeof Promise));
    })
    .catch(() => { })
  })
  it('debe rechazar si no tiene links', () => {
    readFile('./pruebaNoLinks.md').catch((error) => {
      expect(error).toEqual(error);
    })
  });
});

describe('getLinks', () => {
   it('debe devolver una promesa', () => {
    getLinks(absolutePath).then(() => {
      expect(getLinks(absolutePath)).toBe(typeof Promise);
    })
      .catch(() => { })
  });
  it('debe retornar array con objetos {href,text,file}', () => {
    const file = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md'
      },
    ]
   return getLinks(absolutePath).then((result) => {
      expect(result).toEqual(file);
    })
      .catch(() => { })
  });
  it('debe rechazar si hay un error', () => {
   return getLinks('./pruebaNoLinks.md').catch((error) => {
      expect(error).toEqual(error)
    });
  });
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
]

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
