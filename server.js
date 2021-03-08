const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
const port = 8080;

// app.use는 어떤 app에 설정을 해준다. 그 떄 express.json() json으로 정보를 전달했 듯이 express에서도 json 형식으로 데이터 전송한다.
app.use(express.json());
// cors를 적용해 주면 모든 브라우저에서 나에 서버대해 요청할 수 있다.
app.use(cors());
// 서버에서는 해당 파일들을 보여줄 때 우리가 입력했던 경로와 다른 경로를 보여줘야 한다. 그 경로를 우리가 입력했던 대로 보여주는대로 한다.
app.use("/uploads", express.static("uploads"));
// 람다 함수 / 아래와 같은 경로로 함수가 .get 요청이 왔을 때  두 번째 익명 함수가 실행이 된다.
// 상품 정보를 구할 때 (아래 로직)
app.get("/products", (req, res) => {
  // 제품에 있는 모든 파일을 검색(findALL)할 수 없기 때문에 page nation 한정을 걸어둔다. (lmit: 10, where : {}, order: 정렬) 조건을 걸어 where 문도 가능하다.
  models.Product.findAll({
    //limit : 10,
    //where : {}
    order: [["createdAt", "DESC"]],
    // 상품 정보를 업데이트할 때는 description을 받지 않는다. 대신 ㅁ (62줄 아래로 이동)
    attributes: ["id", "name", "price", "createdAt", "seller", "imageUrl"],
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(err);
      res.status(400).send("에러 발생");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller, imageUrl } = body;
  if (!name || !description || !price || !seller || !imageUrl) {
    res.status(400).send("모든 작성폼을 작성해주세요.");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
    imageUrl,
  })
    .then((result) => {
      console.log("상품 생성 결과 :", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 업로드에 문제가 발생했습니다.");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  //findALl: 전체 찾기 // findOne 하나만 찾기
  // ㅁ 단 여기서는 상세 상품 정보를 얻을 수 있다.
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT: ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 조회에 에러가 발생했습니다.");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다.");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((error) => {
      console.error(err);
      console.log("DB연결 에러!");
      process.exit();
    });
});
