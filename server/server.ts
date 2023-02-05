import express, { Request, Response } from "express";
import GetArticleListTypes from "./types";
const app = express();
const oracledb = require("oracledb");

const dbconfig = {
  user: "C##Surplus",
  password: "1005",
  connectString: "localhost:1521/xe",
};

try {
  oracledb.initOracleClient({ libDir: "C:\\instantclient_21_8" });
} catch (err) {
  console.error(err);
}

app.listen("5000", () => {
  console.log(`
  Server listening on port 5000
  `);
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app
  .route("/article")
  .get(async function (request: Request, response: Response) {
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const params: GetArticleListTypes = {
      page: Number(request.query.page) || 1,
    };
    await getPageArcitleList(params, response);
  });

async function getPageArcitleList(
  params: GetArticleListTypes,
  response: Response
) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    let countRes = await connection.execute("SELECT COUNT(*) FROM POSTS");
    let totalArticles = countRes.rows[0]["COUNT(*)"];
    let pageBindings = totalArticles - (params.page - 1) * 15;
    response.send(
      await connection.execute(
        `SELECT * FROM (
          SELECT ROW_NUMBER() OVER (ORDER BY POST_ID) NUM, A.POST_ID, A.WRITER_ID, A.PUBLISHED, A.TITLE, A.VIEWS, A.LIKES, A.COMMENTS, B.USERNAME , B.USER_ID      
          FROM POSTS A INNER JOIN USER_INFO B ON A.WRITER_ID = B.USER_ID
          ORDER BY POST_ID DESC )
      WHERE NUM BETWEEN (:bv1) AND (:bv2)`,
        [pageBindings - 14, pageBindings]
      )
    );
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

// sample
// async function run(request: Request, response: Response) {
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbconfig);
//     response.send(
//       await connection.execute(`SELECT * FROM posts WHERE POST_ID = (:bi)`, [2])
//     );
//     // Binding -> Query 문 내부의 변수 느낌인듯
//     // https://node-oracledb.readthedocs.io/en/latest/user_guide/bind.html#bind
//   } catch (error) {
//     console.log(error);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
// }

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
