const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// app.use는 어떤 app에 설정을 해준다. 그 떄 express.json() json으로 정보를 전달했 듯이 express에서도 json 형식으로 데이터 전송한다.
app.use(express.json());
// cors를 적용해 주면 모든 브라우저에서 나에 서버대해 요청할 수 있다.
app.use(cors());
// 람다 함수 / 아래와 같은 경로로 함수가 .get 요청이 왔을 때  두 번째 익명 함수가 실행이 된다.
app.get("/products", (req, res) => {
  const query = req.query;
  console.log(query);
  res.send({
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

app.post("/products", (req, res) => {
  const body = req.body;
  res.send({
    body,
  });
});

app.get("/products/:id/events/:eventId", (req, res) => {
  const params = req.params;
  const { id, eventId } = params;
  res.send(`id는 ${id}와 ${eventId}입니다.`);
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다.");
});
