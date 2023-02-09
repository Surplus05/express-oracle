import axios from "axios";
import {
  EditPost,
  SignIn,
  SignUp,
  WriteComment,
  WritePost,
} from "../common/types";

export async function getPostList(page: number) {
  return await axios.get("http://localhost:5000/post", {
    params: {
      page,
    },
  });
}

export async function getPost(postId: number) {
  return await axios.get("http://localhost:5000/view", {
    params: {
      postId,
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

export async function signUp(data: SignUp) {
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

export async function signIn(data: SignIn) {
  return await axios.post(
    "http://localhost:5000/signin",
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}

export async function writePost(data: WritePost) {
  return await axios.post("http://localhost:5000/write", JSON.stringify(data), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export async function editPost(data: EditPost) {
  return await axios.post("http://localhost:5000/edit", JSON.stringify(data), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export async function deletePost(postId: number) {
  return await axios.get("http://localhost:5000/delete", {
    params: {
      postId,
    },
  });
}

export async function postSocial(postId: number, like: boolean) {
  return await axios.get("http://localhost:5000/social", {
    params: {
      postId,
      like,
    },
  });
}

export async function getComments(postId: number) {
  return await axios.get("http://localhost:5000/comments", {
    params: {
      postId,
    },
  });
}
export async function writeComment(data: WriteComment) {
  return await axios.post(
    "http://localhost:5000/comments",
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
