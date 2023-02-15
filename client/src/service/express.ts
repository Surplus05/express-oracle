import axios from "axios";
import {
  EditPost,
  SignIn,
  SignUp,
  WriteComment,
  WritePost,
} from "../common/types";

export async function getPostList(page: number) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/post`,
    {
      params: {
        type: "list",
        page,
      },
    }
  );
}

export async function getPost(postId: number) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/post`,
    {
      params: {
        type: "detail",
        postId,
      },
    }
  );
}

export async function checkDuplicate(column: string, data: string) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/user`,
    {
      params: {
        [`${column}`]: data,
      },
    }
  );
}

export async function signUp(data: SignUp) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/user`,
    {
      type: "signUp",
      data,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function signIn(data: SignIn) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/user`,
    {
      type: "signIn",
      data,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function writePost(data: WritePost) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/post`,
    {
      type: "write",
      data,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function editPost(data: EditPost) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/post`,
    {
      type: "edit",
      data,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deletePost(postId: number) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/post`,
    {
      type: "delete",
      postId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function postSocial(postId: number, like: boolean) {
  return await axios.put(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/post`,
    {
      postId,
      like,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function getComments(postId: number) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/comments`,
    {
      params: {
        postId,
      },
    }
  );
}
export async function writeComment(data: WriteComment) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/comments`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// Content-Type -> www-form-urlencoded
// 키에 모든값이 들어있음

// Content-Type -> application/json
// CORS 에러

// 어쩔수없이 text/plain 으로 주고 서버에서 parse 해서 쓰자.
