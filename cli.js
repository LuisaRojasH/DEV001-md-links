const { mdLinks } = require('./index');

mdLinks('./prueba.md', {validate:true})
.then((result)=> {
    console.log(result);
})
.catch((error) => {
    console.log(error);
}); 