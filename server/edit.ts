import { Request, Response } from "express";
import { DBConfig, EditPost } from "./types";

export async function editPost(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig,
  whitelist: string
) {
  response.header("Access-Control-Allow-Origin", whitelist);

  const data: EditPost = JSON.parse(request.body);

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      `UPDATE POSTS SET TITLE = '${data.title}', POST = '${data.post}' WHERE POST_ID = ${data.postId}`,
      []
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
