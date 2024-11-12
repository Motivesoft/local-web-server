# local-web-server
Simple node.js web server for static pages for testing purposes

## Run
The server will serve files from a `public` directory in the current directory as [http://localhost:3000](http://localhost:3000). Launch arguments can be used to configure port, hostname and location of files.

The directory used to hold content should contain a `404.html` file as well as an `index.html`.

```
npm run start

node server.js

node server.js --port=3000 --hostname=localhost --public=C:\www
```