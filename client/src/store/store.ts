import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/products-slice"
import adminOrderSlice from "./admin/order-slice"
import commonFeatureSlice from "./common-slice"

const store = configureStore({
    reducer: {
       auth: authReducer,
       adminProducts:  adminProductsSlice,
       adminOrder: adminOrderSlice,
       commonFeature: commonFeatureSlice,
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch