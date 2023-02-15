import express, { Request, Response } from "express";
import { getCommentList, writeComment } from "./comment";
import {
  deletePost,
  editPost,
  getPost,
  getPostList,
  socialInteraciton,
  writePost,
} from "./post";
import { checkDuplicate, signIn, signUp } from "./user";
const app = express();
const oracledb = require("oracledb");
const whitelist = [
  "http://localhost:3000",
  "http://192.168.55.90:3000",
  "http://1.251.1.56:5000",
  "http://1.251.1.56",
  "https://surplus05.github.io",
];

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

app.use(function (req, res, next) {
  const origin = req.headers.origin as string;
  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.sendStatus(404);
    return;
  }
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.listen("5000", () => {
  console.log(`
  Server listening on port 5000
  `);
});

app.use(express.text());
app.use(express.json());

app
  .route("/post")
  .get((request: Request, response: Response) => {
    if (request.query.type === "list")
      getPostList(request, response, oracledb, dbconfig);
    else if (request.query.type === "detail")
      getPost(request, response, oracledb, dbconfig);
    else response.sendStatus(404);
  })
  .post((request: Request, response: Response) => {
    if (request.body.type === "write")
      writePost(request.body.data, response, oracledb, dbconfig);
    else if (request.body.type === "edit")
      editPost(request.body.data, response, oracledb, dbconfig);
    else if (request.body.type === "delete")
      deletePost(request.body.postId, response, oracledb, dbconfig);
    else response.sendStatus(404);
  })
  .put((request: Request, response: Response) => {
    socialInteraciton(
      request.body.postId,
      request.body.like,
      response,
      oracledb,
      dbconfig
    );
  });

app
  .route("/comments")
  .get((request: Request, response: Response) => {
    getCommentList(request, response, oracledb, dbconfig);
  })
  .post((request: Request, response: Response) => {
    writeComment(request, response, oracledb, dbconfig);
  });

app
  .route("/user")
  .get((request: Request, response: Response) => {
    checkDuplicate(request, response, oracledb, dbconfig);
  })
  .post((request: Request, response: Response) => {
    if (request.body.type === "signIn")
      signIn(request.body.data, response, oracledb, dbconfig);
    else if (request.body.type === "signUp")
      signUp(request.body.data, response, oracledb, dbconfig);
    else response.sendStatus(400);
  });
