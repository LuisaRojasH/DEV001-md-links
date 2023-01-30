const { mdLinks } = require('./index.js');

mdLinks().then(()=>{})
.catch((error) => {
    console.log(error);
});