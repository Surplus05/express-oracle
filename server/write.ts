import { Request, Response } from "express";
import { DBConfig, WritePost } from "./types";

export async function writePost(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig,
  whitelist: string[]
) {
  response.header("Access-Control-Allow-Origin", whitelist);

  const data: WritePost = JSON.parse(request.body);

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      `INSERT INTO POSTS VALUES(POSTS_SEQ.NEXTVAL, ${data.writerId}, '${data.post}', sysdate, '${data.title}', 0, 0, 0, 0)`
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
