import axios from "axios";

export async function getPageArcitleList(page: number) {
  return await axios.get("http://localhost:5000/article", {
    params: {
      page: page,
    },
  });
}

export async function checkDuplicate(column: string, data: string) {
  return await axios.get("http://localhost:5000/signup", {
    params: {
      [`${column}`]: data,
    },
  });
}

export async function registerPost(mail: string, pw: string, username: string) {
  const data = {
    mail,
    pw,
    username,
  };
  return await axios.post(
    "http://localhost:5000/signup",
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}

// Content-Type -> www-form-urlencoded
// 키에 모든값이 들어있음

// Content-Type -> application/json
// CORS 에러

// 어쩔수없이 text/plain 으로 주고 서버에서 parse 해서 쓰자.
