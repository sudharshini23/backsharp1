const http = require('http')

const routes = require('./routes.js')

// USING METHOD 1: TO HANDLER NODE MODULE SYSTEM
    // ------------------------------------------------
// const server = http.createServer(routes); // only routes without () => execute function stored in routes request
    // -----------------------------------------

// METHOD 2: TO HANDLE NODE MODULE SYSTEM USING OBJECT KEY-VALUE
    const server = http.createServer(routes.handler)

    console.log(routes.someText)

    server.listen(3000);
