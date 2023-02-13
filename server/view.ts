import { Request, Response } from "express";
import { DBConfig } from "./types";

export async function getPost(
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
    await connection.execute(
      `UPDATE POSTS SET VIEWS = VIEWS + 1 WHERE POST_ID = ${postId}`
    );
    connection.commit();
    let data = await connection.execute(
      `SELECT A.POST_ID, A.WRITER_ID, A.POST, A.PUBLISHED, A.TITLE, A.VIEWS, A.LIKES, A.DISLIKES, A.COMMENTS, B.USERNAME , B.USER_ID      
      FROM POSTS A INNER JOIN USER_INFO B ON A.WRITER_ID = B.USER_ID WHERE A.POST_ID = ${postId}
      `,
      []
    );
    response.send(data.rows[0]);
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
