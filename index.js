var http = require("http");
var hostname = "127.0.0.1";
var port = 8080;

const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const products = JSON.stringify([
        {
          name: "농구공",
          price: 50000,
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다.");
    }
  }
  res.end("GOOD Bye");
});

server.listen(port, hostname);

console.log("grab market server on!");

// npm install express (framework)
// npm install cors (서버가 브라우저에게 요청을 허용하기 위해 cors를 사용한다.)
