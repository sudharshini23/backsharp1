const http = require('http');
const server = http.createServer((req,res) => {
    res.write('<html>')
    res.write('<body><h1> Welcome to my Node Js project </h1></body>')
    res.write('</html>')

    const url = req.url;
    // console.log(url);

    if(url.includes('/home')) {
        res.write('Welcome home')
    }

    else if(url.includes('/about')) {
        res.write('Welcome to About Us page')
    }

    else if(url.includes('/node')) {
        res.write('Welcome to my Node Js project')
    }

    // if(req.url = '/home') {
    //     res.write('Welcome home')
    // }
    
    // if(req.url = '/about') {
    //     res.write('Welcome to About Us page')
    // }

    // if(req.url = '/node') {
    //     res.write('Welcome to my Node Js project')
    // }

    res.end();
})

server.listen(4000);