const http = require('http');
const server = http.createServer((req,res) => {
    console.log("Sudharshini");
    res.write('Sudharshini');
    // res.end("server start")
    res.end();
})
server.listen(4000);