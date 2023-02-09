import { Request, Response } from "express";
import { DBConfig, SignInInfo } from "./types";

export async function signIn(
  request: Request,
  response: Response,
  oracledb: any,
  dbconfig: DBConfig,
  whitelist: string[]
) {
  response.header("Access-Control-Allow-Origin", whitelist);

  const data: SignInInfo = JSON.parse(request.body);

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
