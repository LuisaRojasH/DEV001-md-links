const { mdLinks } = require('./index');

/*const options = process.argv.slice(2);
const path = process.argv[2];
const validate = options.includes('--validate');

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


mdLinks('./README.md', {validate:true}).then((result)=> {
    console.log(result.flat());
})
.catch((error) => {
    console.log(error);
}); 