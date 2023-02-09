import { Request, Response } from "express";
import { DBConfig, SignUpInfo, UserInfo } from "./types";

export async function checkDuplicate(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig,
  whitelist: string[]
) {
  response.header("Access-Control-Allow-Origin", whitelist);

  const params: UserInfo = request.query;

  let columnName: string;
  let data: string;

  if (params.email != null && params.username == null) {
    columnName = "MAIL";
    data = params.email;
  } else if (params.email == null && params.username != null) {
    columnName = "USERNAME";
    data = params.username;
  } else {
    response.status(404);
    response.send();
    return;
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    let isDuplicated = await connection.execute(
      `SELECT COUNT(*) FROM USER_INFO WHERE ${columnName} = '${data}'`
    );
    response.send(isDuplicated.rows[0]);
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

export async function signUp(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig,
  whitelist: string[]
) {
  response.header("Access-Control-Allow-Origin", whitelist);

  const data: SignUpInfo = JSON.parse(request.body);

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      `INSERT INTO USER_INFO VALUES(USER_INFO_SEQ.NEXTVAL, '${data.username}', '${data.mail}', '${data.pw}', sysdate)`
    );
    await connection.commit();
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
