const { mdLinks } = require('./index');

mdLinks('./README.md').then((result)=> {
    console.log(result);
})
.catch((error) => {
    console.log(error);
}); 