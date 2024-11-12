const http = require('http');
const fs = require('fs');
const path = require('path');

// Get command-line arguments
const args = process.argv.slice(2);

// Look for switches
const hostnameArg = args.find(arg => arg.startsWith('--hostname='));
const portArg = args.find(arg => arg.startsWith('--port='));
const publicFolderArg = args.find(arg => arg.startsWith('--public='));

// Look for hostname or use default (localhost)
const hostname = hostnameArg 
  ? hostnameArg.split('=')[1] 
  : "localhost";

// Look for port or use default (3000)
const port = parseInt( portArg 
  ? portArg.split('=')[1] 
  : 3000 );

// Set default public folder or use the provided argument
const publicFolder = publicFolderArg 
  ? publicFolderArg.split('=')[1] 
  : path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    let filePath = path.join(publicFolder, req.url === '/' ? 'index.html' : req.url);
    let contentType = 'text/html';
    let extname = path.extname(filePath);

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Serving files from: ${publicFolder}`);
  });