const { default: axios } = require('axios');
const { validateLinks } = require('../functions')

jest.mock('axios');

describe('validateLinks', () => {
    it('debe ser una funcion', () => {
        expect(typeof validateLinks).toBe('function');
    });
   it('debe retornar array con objetos {href,text,file,status,ok}', () => {
    const data = [
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md',
        },
    ]
    const statusOk = [
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\prueba.md',
            status: 200,
        },
    ]
     axios.get.mockResolvedValue({ status: 200 })
        validateLinks(data).then((result) => {
            expect(result).toEqual(statusOk)
        });
    });
    it('debe retornar array con objetos {href,text,file,status,ok} con error en status', () => {
        const dataError = [
            {
                href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
                text: 'Funciones — bloques de código reutilizables - MDN',
                file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\README.md',
            },
        ]
        const statusFail = [
            {
                href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
                text: 'Funciones — bloques de código reutilizables - MDN',
                file: 'C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\Luisa\\Laboratoria\\DEV001-md-links\\README.md',
                status: 404,
                ok: 'Fail'
            },
        ]
        axios.get.mockResolvedValueOnce({ status: 404, ok: 'Fail', })
         validateLinks(dataError).catch((error) => {
            expect(error).toEqual(statusFail)
        })
    });
});
