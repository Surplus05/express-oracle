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
        page,
      },
    }
  );
}

export async function getPost(postId: number) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/view`,
    {
      params: {
        postId,
      },
    }
  );
}

export async function checkDuplicate(column: string, data: string) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/signup`,
    {
      params: {
        [`${column}`]: data,
      },
    }
  );
}

export async function signUp(data: SignUp) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/signup`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function signIn(data: SignIn) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/signin`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function writePost(data: WritePost) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/write`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function editPost(data: EditPost) {
  return await axios.post(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/edit`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deletePost(postId: number) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/delete`,
    {
      params: {
        postId,
      },
    }
  );
}

export async function postSocial(postId: number, like: boolean) {
  return await axios.get(
    `http://${process.env.REACT_APP_EXPRESS_ADDRESS}:5000/social`,
    {
      params: {
        postId,
        like,
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
// ?????? ???????????? ????????????

// Content-Type -> application/json
// CORS ??????

// ??????????????? text/plain ?????? ?????? ???????????? parse ?????? ??????.
