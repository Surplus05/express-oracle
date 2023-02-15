import { Request, Response } from "express";
import { DBConfig, EditPost, WritePost } from "./types";

const POST_PER_PAGE = 15;

export async function getPostList(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
  const page = Number(request.query.page) || 1;

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    let countRes = await connection.execute("SELECT COUNT(*) FROM POSTS");
    let totalPosts = countRes.rows[0]["COUNT(*)"];
    let pageBindings = totalPosts - (page - 1) * POST_PER_PAGE;
    let data = await connection.execute(
      `SELECT * FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY POST_ID) NUM, A.POST_ID, A.WRITER_ID, A.PUBLISHED, A.TITLE, A.VIEWS, A.LIKES, A.COMMENTS, B.USERNAME , B.USER_ID      
        FROM POSTS A INNER JOIN USER_INFO B ON A.WRITER_ID = B.USER_ID
        ORDER BY POST_ID DESC )
    WHERE NUM BETWEEN (:bv1) AND (:bv2)`,
      [pageBindings - POST_PER_PAGE - 1, pageBindings]
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

export async function writePost(
  data: WritePost,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
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

export async function editPost(
  data: EditPost,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
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

export async function deletePost(
  postId: number,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
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

export async function socialInteraciton(
  postId: number,
  like: boolean,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
  if (postId == null || like == null) {
    response.sendStatus(404);
    return;
  }

  const likeType = like ? "LIKES" : "DISLIKES";

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
