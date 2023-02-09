import { Request, Response } from "express";
import { DBConfig } from "./types";

export async function getPostList(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig,
  whitelist: string[]
) {
  response.header("Access-Control-Allow-Origin", whitelist);

  const page = Number(request.query.page) || 1;

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    let countRes = await connection.execute("SELECT COUNT(*) FROM POSTS");
    let totalPosts = countRes.rows[0]["COUNT(*)"];
    let pageBindings = totalPosts - (page - 1) * 24;
    let data = await connection.execute(
      `SELECT * FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY POST_ID) NUM, A.POST_ID, A.WRITER_ID, A.PUBLISHED, A.TITLE, A.VIEWS, A.LIKES, A.COMMENTS, B.USERNAME , B.USER_ID      
        FROM POSTS A INNER JOIN USER_INFO B ON A.WRITER_ID = B.USER_ID
        ORDER BY POST_ID DESC )
    WHERE NUM BETWEEN (:bv1) AND (:bv2)`,
      [pageBindings - 23, pageBindings]
    );

    response.send({ ...data, totalPosts });
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
