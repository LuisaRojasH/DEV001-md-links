const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
  it('deberia devolver una promesa', () => {
    expect(mdLinks('./README.md')).toBe(typeof Promise);
  });
  it('debe rechazar cuando el path no existe', () => {
    return mdLinks('./noexiste.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    });
  });
  it('debe rechazar cuando el archivo no es .md', () => {
    return mdLinks('C:\Users\LABORATORIA\OneDrive\Escritorio\Luisa\Laboratoria\DEV001-md-links\DF-MdLinks.jpg').catch((error) =>{
      expect(error).toBe('el archivo no es .md');
    });
  });
});
