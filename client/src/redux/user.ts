import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../common/types";

const initialState: UserState = {
  USER_ID: -1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    login(state, action) {
      return action.payload;
    },
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;

// 처음엔 request 를 createAsyncThunk 에서 하는걸로 구현했었지만
// reject 처리하기가 껄끄러웠음.
// signInModal 에서 결과를 받고 처리해 주자.
// success -> 로그인, redux에 저장
// fail -> signInModal 에 경고창 출력.

// export const signIn = createAsyncThunk<object, SignInTypes>(
//   "user/signin",
//   async (data: SignInTypes) => {
//     let response = await signInRequest(data);
//     return response;
//   }

//   extraReducers: (builder) => {
//     builder.addCase(signIn.fulfilled, (state, action) => {
//       // set userCredential value usint received data
//     });
//     builder.addCase(signIn.rejected, (state, action) => {
//       console.log("rejected!");
//     });
//   }
