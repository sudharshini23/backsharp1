/*
If the URL is '/':
the server will respond with an HTML form that allows the user to enter some data and submit it to the server using the POST method.

If the URL is '/message' and the method is POST: 
the server will retrieve the data from the request body
write it to a file named 'data.txt'
and then redirect the user back to the root URL ('/') using a status code of 302.
For any other URL or method, the server will respond with a simple HTML page that displays a message.

// DONT FORGET POST METHOD IN form
*/

const http = require('http')
const fs = require('fs')
const fs2 = require('fs');
// const { url } = require('inspector')

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        // READING AND WRITING ARE ASYNCHRONOUS OPERATIONS
        // Read and print from file:
        // ----------------------------------------------
        // const filePath = path.join(_dirname,"message.txt");
        // ------------------------------------------------
        // OR directly read from file

        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
            //console.log(data);
            res.write('<html>')
            res.write('<head><title>Enter Message</title></head>')
            res.write(`<body>${data}</body>`)
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
            res.write('<html>')
            return res.end();
        })
    }

    else if(url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        })
        
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,err => {
                if(err) {
                    console.log(err);
                }
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            })
            // res.statusCode = 302;
            // res.setHeader('Location','/');
            // return res.end();
        })
    }

    else {
        res.setHeader('Content-Type','text/html');

        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><h1>Hello from Node.js Server!</h1></body>');
        res.write('</html>');
        res.end();
    }

})

server.listen(4000);