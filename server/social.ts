import { Request, Response } from "express";
import { DBConfig } from "./types";

export async function socialInteraciton(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
  const postId = Number(request.query.postId);
  const likeType = request.query.like === "true" ? "LIKES" : "DISLIKES";

  if (postId == null || likeType == null) {
    response.sendStatus(404);
    return;
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      `UPDATE POSTS SET ${likeType} = ${likeType} + 1 WHERE POST_ID = ${postId}`
    );
    connection.commit();
    let social = await connection.execute(
      `SELECT ${likeType} FROM POSTS WHERE POST_ID = ${postId}`
    );
    response.send(social.rows[0]);
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
