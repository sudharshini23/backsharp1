const fs = require('fs')

// GET REQUEST FROM appdemo.js file:

// METHOD 1:
// ---------------------------------------
// function requestHandler(req,res) {

// }
// ----------------------------------------

// METHOD 2: ES 6:
// ----------------------------------------
const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {   // === means if url is both a string and has a value of /
        // returns a form that contains some html that gives user an input form and a button that sends a new req (not a GET req)
        
        // --------------------------
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        // ------------------------------
    
        // (/message targets localhost 3000 as mentioned in server to contact)
        // need to get a url -> use GET request -> automatically sent when click a link or enter a url
        // but for form use POST request -> set up by individual by using form/JS methods
        // POST request sent to /message
        // Form detects any input and if given a name such as "details"/"message"/"any_name"
        // The form automatically puts this "details" into the request it sends to server
    
        // ---------------------------------------------------
        res.write('<body><form action="/message" method="POST"><input type="text" name="details"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // --------------------------------------------------
    
        // return res.end() is used so that it returns the response and doesnt continue to execute the code below
        
        // ----------------------------------------------
        return res.end();
        // ---------------------------------------------
    
        // after the if statement executes when we click send on form button it goes to /message and since /message !== /, it returns the below part of the code
    }
    
    // checks if url has /message and also if method is POST method and sends request POST to /message
    
    // --------------------------------------------------------
    if(url === '/message' && method === 'POST') {
    
        // Before sending POST message, and before sending response and before writing to file -> get request data
        // Register an event listener with the request
        // --------------------------------------------
        const body = []; // try to read request body // cannot reassign new value to const, but with push data, changing object behind body element - editing data in object not object itself
        // Argument 1 - type of event, Argument 2 - function that needs to be executed for data chunk
        // ON allows to listen to certain events - data event is registered whenever there is new chunk of data
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        }) 
        // Use another event listener - end listener - fired once done with parsing incoming requests
        return req.on('end', () => {
            // In this func, all chunks read and stored in body
            // Need to buffer - use Buffer Object
            // Create a new buffer and add new chunks to body - body of incoming request is text
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody); // gives a key value pair: details=message_typed_by_user
            const message = parsedBody.split('=')[1];
            // Move writefilesync func into end req and get message
            // fs.writeFileSync('message.txt',message);
            // includes 3rd parameter that has callback that executes when its done, error handling
            // the response inside err shoudl be sent only when done working with file
            fs.writeFile('details.txt',message,err => {
                res.statusCode = 302;
                res.setHeader('Location','/')
                return res.end();
            })
            // res.statusCode = 302;
            // res.setHeader('Location','/')
            // return res.end();
        })
        
        // --------------------------------------
    
        // Redirect user to /nothing and create new file and store the message the user entered in it
        // TO create a new file -> import the fs package
        // -----------------------------------------
        // fs.writeFileSync('message.txt','DUMMY TEXT');
        // ------------------------------------------
    
        // Redirect - writeHead allows to write meta information to redirection to 302 page
        // pass JS objects as headers
    
        // -----------------------------------------
        // res.writeHead(302, )
        // res.statusCode = 302;
        // res.setHeader('Location','/')
        // return res.end();
        // -----------------------------------------
    
        // In the network tab after reload, message 302 indicates sent a request to message and redirected to localhost
    
        // Instead of getting a DUMMY TEXT data in details.txt -> we parse the request and get data sent by request
        // Incoming data is sent as stream of data
    }
    
    // attaches header to response - meta info passed as argument like type of content which is part of response is html
    
    //------------------------------------------------------
    res.setHeader('Content-Type', 'text/html')
    //---------------------------------------------------
    
    // allows to write some data to the response
    
    //------------------------------------------------------
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from Node.js Server!</h1></body>');
    res.write('</html>');
    res.end(); // response sent back to client
    // -----------------------------------------------------
    
    //---------------------------
    // res.write();
    //---------------------------
};    //anonymous arrow func

// METHOD 1 TO EXPORT: At the end of file, at the bottom:
// -----------------------------------------------------
// module.exports = requestHandler
// -----------------------------------------------------
// module exports is aglobal object exposed to node, so now from routes, requestHandler which has all data can be imported

// METHOD 2:
// -----------------------------------------------------
// module.exports = {      // use objects for handler-key
//     handler: requestHandler,
//     someText: 'Some Coded Text'
// }
// -----------------------------------------------------

// METHOD 3:
// -----------------------------------------------------
// module.exports.handler = requestHandler;
// module.exports.someText = 'Some Coded Text';
// -----------------------------------------------------

// METHOD 4:
// -----------------------------------------------------
exports.handler = requestHandler;
exports.someText = 'Some Coded Text';
// -----------------------------------------------------