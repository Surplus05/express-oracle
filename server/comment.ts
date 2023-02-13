import { Request, Response } from "express";
import { Comment, DBConfig } from "./types";

export async function getCommentList(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
  const postId = Number(request.query.postId);

  if (postId == null) {
    response.sendStatus(404);
    return;
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    let data = await connection.execute(
      `SELECT A.COMMENT_ID, A.POST_ID, A.WRITER_ID, A.COMMENT_TEXT, A.PUBLISHED, B.POST_ID, C.USER_ID, C.USERNAME   
      FROM COMMENTS A INNER JOIN POSTS B ON A.POST_ID = B.POST_ID INNER JOIN USER_INFO C ON A.WRITER_ID = C.USER_ID WHERE B.POST_ID = ${postId} ORDER BY A.PUBLISHED ASC`,
      []
    );
    response.send(data.rows);
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

export async function writeComment(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
  const data: Comment = request.body;
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    connection.execute(`INSERT INTO COMMENTS VALUES(COMMENTS_SEQ.NEXTVAL, ${data.postId}, ${data.userId}, '${data.text}', sysdate)
    `);
    connection.execute(
      `UPDATE POSTS SET COMMENTS = COMMENTS + 1 WHERE POST_ID = ${data.postId}`
    );
    connection.commit();
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
