import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import user from "./user";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  user,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

// createAsyncThunk쓸 경우 아래 코드 필요함.
// // Infer the `RootState` and `AppDispatch` types from the store itself
// type RootState = ReturnType<typeof rootStore.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// type AppDispatch = typeof rootStore.dispatch;
// export const useRootDispatch: () => AppDispatch = useDispatch;
// export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
