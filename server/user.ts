import { Request, Response } from "express";
import { DBConfig, SignInInfo, SignUpInfo, UserInfo } from "./types";

export async function checkDuplicate(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
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
    response.sendStatus(404);
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
  data: SignUpInfo,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
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

export async function signIn(
  data: SignInInfo,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig
) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    let userInfo = await connection.execute(
      `SELECT USER_INFO.USER_ID FROM USER_INFO WHERE MAIL='${data.mail}' AND PW = '${data.pw}'`
    );
    if (userInfo.rows.length) {
      response.send(userInfo);
    } else {
      response.status(401);
      response.send();
    }
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
