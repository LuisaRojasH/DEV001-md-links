const { mdLinks } = require('../src/index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
 // it('deberia devolver una promesa', () => {
  // expect(mdLinks()).toBe(typeof Promise);
 // });
  it('debe rechazar cuando el path no existe', () => {
   return mdLinks('./noexiste.md').catch((error) => {
   expect(error).toBe('la ruta no existe');
   });
  });
});
