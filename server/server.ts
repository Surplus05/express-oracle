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
const whitelist = ["http://localhost:3000", "http://192.168.55.90:3000"];

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
  const origin = request.headers.origin as string;
  if (whitelist.includes(origin)) {
    getPostList(request, response, oracledb, dbconfig, origin);
  } else {
    response.sendStatus(404);
  }
});

app.route("/view").get((request: Request, response: Response) => {
  const origin = request.headers.origin as string;
  if (whitelist.includes(origin)) {
    getPost(request, response, oracledb, dbconfig, origin);
  } else {
    response.sendStatus(404);
  }
});

app.route("/social").get((request: Request, response: Response) => {
  const origin = request.headers.origin as string;
  if (whitelist.includes(origin)) {
    socialInteraciton(request, response, oracledb, dbconfig, origin);
  } else {
    response.sendStatus(404);
  }
});

app
  .route("/comments")
  .get((request: Request, response: Response) => {
    const origin = request.headers.origin as string;
    if (whitelist.includes(origin)) {
      getCommentList(request, response, oracledb, dbconfig, origin);
    } else {
      response.sendStatus(404);
    }
  })
  .post((request: Request, response: Response) => {
    const origin = request.headers.origin as string;
    if (whitelist.includes(origin)) {
      writeComment(request, response, oracledb, dbconfig, origin);
    } else {
      response.sendStatus(404);
    }
  });

app
  .route("/signup")
  .get((request: Request, response: Response) => {
    const origin = request.headers.origin as string;
    if (whitelist.includes(origin)) {
      checkDuplicate(request, response, oracledb, dbconfig, origin);
    } else {
      response.sendStatus(404);
    }
  })
  .post((request: Request, response: Response) => {
    const origin = request.headers.origin as string;
    if (whitelist.includes(origin)) {
      signUp(request, response, oracledb, dbconfig, origin);
    } else {
      response.sendStatus(404);
    }
  });

app.route("/signin").post((request: Request, response: Response) => {
  const origin = request.headers.origin as string;
  if (whitelist.includes(origin)) {
    signIn(request, response, oracledb, dbconfig, origin);
  } else {
    response.sendStatus(404);
  }
});

app.route("/write").post((request: Request, response: Response) => {
  const origin = request.headers.origin as string;
  if (whitelist.includes(origin)) {
    writePost(request, response, oracledb, dbconfig, origin);
  } else {
    response.sendStatus(404);
  }
});

app.route("/edit").post((request: Request, response: Response) => {
  const origin = request.headers.origin as string;
  if (whitelist.includes(origin)) {
    editPost(request, response, oracledb, dbconfig, origin);
  } else {
    response.sendStatus(404);
  }
});

app.route("/delete").get((request: Request, response: Response) => {
  const origin = request.headers.origin as string;
  if (whitelist.includes(origin)) {
    deletePost(request, response, oracledb, dbconfig, origin);
  } else {
    response.sendStatus(404);
  }
});
