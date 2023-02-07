const { mdLinks } = require('./index');

/*const options = process.argv.slice(2);
const path = process.argv[2];
const validate = options.includes('--validate');
const stats = options.includes('--stats');

if (options.length === 1) {
    mdLinks(path, {validate:false})
    .then((result) => {
        console.log(result.flat());
    })
    .catch((error) => {
        console.log(error);
    })
} else {
    mdLinks(path, {validate:true})
    .then((result) => {
        console.log(result.flat());
    })
    .catch((error) => {
        console.log(error);
    })
}*/


mdLinks('./prueba.md', {validate:true}).then((result)=> {
    console.log(result);
})
.catch((error) => {
    console.log(error);
}); 