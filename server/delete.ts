import { Request, Response } from "express";
import { DBConfig } from "./types";

export async function deletePost(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig,
  whitelist: string[]
) {
  response.header("Access-Control-Allow-Origin", whitelist);

  console.log("test");
  let postId = Number(request.query.postId);
  if (postId == null) {
    response.status(404);
    response.send();
    return;
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      `DELETE FROM COMMENTS WHERE POST_ID = ${postId}`,
      []
    );
    await connection.execute(`DELETE FROM POSTS WHERE POST_ID = ${postId}`, []);
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
