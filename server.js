const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = "";
    let statusCode = 200;

    switch (req.url) {
        case "/":
        case "/home":
            filePath = "./pages/home.html";
            break;

        case "/about":
            filePath = "./pages/about.html";
            break;

        case "/contact":
            filePath = "./pages/contact.html";
            break;

        case "/css/style.css":
            filePath = "./css/style.css";
            res.setHeader("Content-Type", "text/css");
            break;

        default:
            filePath = "./pages/404.html";
            statusCode = 404;
    }

    fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
        res.writeHead(500, {"Content-Type": "text/html"});
        res.end("<h1>500 - Internal server error</h1>");
    } else {
        const ext = path.extname(filePath);

        let contentType = "text/html";
        if (ext === ".css") contentType = "text/css";

        res.writeHead(statusCode, { "Content-Type": contentType });
        res.end(data);
    };
});
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 