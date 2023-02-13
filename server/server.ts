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
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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

app.route("/post").get((request: Request, response: Response) => {
  getPostList(request, response, oracledb, dbconfig);
});

app.route("/view").get((request: Request, response: Response) => {
  getPost(request, response, oracledb, dbconfig);
});

app.route("/social").get((request: Request, response: Response) => {
  socialInteraciton(request, response, oracledb, dbconfig);
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
  .route("/signup")
  .get((request: Request, response: Response) => {
    checkDuplicate(request, response, oracledb, dbconfig);
  })
  .post((request: Request, response: Response) => {
    signUp(request, response, oracledb, dbconfig);
  });

app.route("/signin").post((request: Request, response: Response) => {
  signIn(request, response, oracledb, dbconfig);
});

app.route("/write").post((request: Request, response: Response) => {
  writePost(request, response, oracledb, dbconfig);
});

app.route("/edit").post((request: Request, response: Response) => {
  editPost(request, response, oracledb, dbconfig);
});

app.route("/delete").get((request: Request, response: Response) => {
  deletePost(request, response, oracledb, dbconfig);
});
