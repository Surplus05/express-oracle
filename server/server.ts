import express, { Request, Response } from "express";
import { getCommentList, writeComment } from "./comment";
import { deletePost } from "./delete";
import { editPost } from "./edit";
import { getPostList } from "./post";
import { signIn } from "./signin";
import { checkDuplicate, signUp } from "./signup";
import { socialInteraciton } from "./social";
import { getPost } from "./view";
import { writePost } from "./write";
const app = express();
const oracledb = require("oracledb");
const whitelist = ["http://localhost:3000"];

export const dbconfig = {
  user: "C##Surplus",
  password: "1005",
  connectString: "localhost:1521/xe",
};

try {
  oracledb.initOracleClient({ libDir: "C:\\instantclient_21_8" });
} catch (err) {
  console.error(err);
}
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.listen("5000", () => {
  console.log(`
  Server listening on port 5000
  `);
});

app.use(express.text());

app.route("/post").get((request: Request, response: Response) => {
  getPostList(request, response, oracledb, dbconfig, whitelist);
});

app.route("/view").get((request: Request, response: Response) => {
  getPost(request, response, oracledb, dbconfig, whitelist);
});

app.route("/social").get((request: Request, response: Response) => {
  socialInteraciton(request, response, oracledb, dbconfig, whitelist);
});

app
  .route("/comments")
  .get((request: Request, response: Response) => {
    getCommentList(request, response, oracledb, dbconfig, whitelist);
  })
  .post((request: Request, response: Response) => {
    writeComment(request, response, oracledb, dbconfig, whitelist);
  });

app
  .route("/signup")
  .get((request: Request, response: Response) => {
    checkDuplicate(request, response, oracledb, dbconfig, whitelist);
  })
  .post((request: Request, response: Response) => {
    signUp(request, response, oracledb, dbconfig, whitelist);
  });

app.route("/signin").post((request: Request, response: Response) => {
  signIn(request, response, oracledb, dbconfig, whitelist);
});

app.route("/write").post((request: Request, response: Response) => {
  writePost(request, response, oracledb, dbconfig, whitelist);
});

app.route("/edit").post((request: Request, response: Response) => {
  editPost(request, response, oracledb, dbconfig, whitelist);
});

app.route("/delete").get((request: Request, response: Response) => {
  deletePost(request, response, oracledb, dbconfig, whitelist);
});

// 문제점1.
// 오류나서 살펴보니 ORACLE 에서는 LIMIT이 안먹힌다.
// ROWNUM 을 사용하자.
// WHERE ROWNUM = 2 안먹힘. WHY?
// 조건을 만족시키는 것이 와야 ROWNUM 이 증가되기 때문.
// 그래서 WHERE ROWNUM < 10 AND RONUM > 5 이런식으로 작동못함.
// <랑 <= 만 작동한다.

// 문제점 2.
// CORS

// 문제점 3.
// 15개씩 가져온다 -> PAGING X. 한 페이지가 15라면 상위 15개씩을 가져와야 함.
// COUNT 하고 계산이 추가됨. 하나둘씩 추가되면 -> SERVER에 부담이지 않을까?

// 문제점 4.
// post method에서 application/json 을 그대로 받는것은 불가능 인코딩해 받아야함.
// www-form-urlencoded 으로 인코딩된다.
// 왜 key에 모든값이 들어가있는걸까

// 논의 1.
// 분기 처리를 오라클 함수 내부 외부 어디서 할 지 고민이다.
// 함수 외부에서 하는게 맞아 보임.
// 함수에서는 oracle 관련 로직만 실행하고 그 결과에 따른 response 는 app.route 쪽에서 처리하는것이 맞다고 봄.
