import express, { Request, Response } from "express";
import GetArticleListTypes, {
  GetIsDuplicateTypes,
  PostUserInfoTypes,
} from "./types";
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
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.listen("5000", () => {
  console.log(`
  Server listening on port 5000
  `);
});

app.use(express.text());

app
  .route("/article")
  .get(async function (request: Request, response: Response) {
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const params: GetArticleListTypes = {
      page: Number(request.query.page) || 1,
    };
    await getPageArcitleList(params, response);
  });

app
  .route("/signup")
  .get(async function (request: Request, response: Response) {
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const params: GetIsDuplicateTypes = request.query;
    await getIsDuplicate(params, response);
  })
  .post(async function (request: Request, response: Response) {
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");

    await postUserInfo(JSON.parse(request.body), response);
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
    let pageBindings = totalArticles - (params.page - 1) * 24;
    let data = await connection.execute(
      `SELECT * FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY POST_ID) NUM, A.POST_ID, A.WRITER_ID, A.PUBLISHED, A.TITLE, A.VIEWS, A.LIKES, A.COMMENTS, B.USERNAME , B.USER_ID      
        FROM POSTS A INNER JOIN USER_INFO B ON A.WRITER_ID = B.USER_ID
        ORDER BY POST_ID DESC )
    WHERE NUM BETWEEN (:bv1) AND (:bv2)`,
      [pageBindings - 23, pageBindings]
    );

    response.send({ ...data, totalArticles });
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

async function getIsDuplicate(params: GetIsDuplicateTypes, response: Response) {
  let connection;
  let columnName: string;
  let data: string;
  if (params.email != null && params.username == null) {
    columnName = "MAIL";
    data = params.email;
  } else if (params.email == null && params.username != null) {
    columnName = "USERNAME";
    data = params.username;
  } else {
    throw new Error("Wrong parameter");
  }

  try {
    connection = await oracledb.getConnection(dbconfig);
    let isDuplicate = await connection.execute(
      `SELECT COUNT(*) FROM USER_INFO WHERE ${columnName} = '${data}'`
    );
    response.send(isDuplicate.rows[0]);
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

async function postUserInfo(data: PostUserInfoTypes, response: Response) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      `INSERT INTO USER_INFO VALUES(USER_INFO_SEQ.NEXTVAL, '${data.username}', '${data.mail}', '${data.pw}', sysdate)`
    );
    await connection.commit();
    response.send(true);
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

// 문제점 4.
// post method에서 application/json 을 그대로 받는것은 불가능 인코딩해 받아야함.
// www-form-urlencoded 으로 인코딩된다.
// 왜 key에 모든값이 들어가있는걸까
