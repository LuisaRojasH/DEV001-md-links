const {
    pathExist,
    toAbsolute,
    mdFile,
    readFile,
    getLinks } = require('../functions.js');
    
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
