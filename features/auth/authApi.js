import { apiSlice } from "../api/apiSlice";
import { loginUserFound, startLoading, stopeLoading } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoginUser: builder.query({
      query: () => ({
        url: `users/get-login-user`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["users"],
      providesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(startLoading());
        try {
          const result = await queryFulfilled;
          if (result?.data?.data?._id) {
            return dispatch(loginUserFound(result?.data?.data));
          }
        } catch (err) {
          dispatch(stopeLoading());
        }
      },
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: `users/create-user`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data?.user?._id) {
            dispatch(loginUserFound(result.data.user));
          }
        } catch (err) {}
      },
    }),

    googleLogin: builder.query({
      query: () => ({
        url: `users/login/auth/google`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["users"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: `users/login-user`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data?.user?._id) {
            dispatch(loginUserFound(result.data.user));
          }
        } catch (err) {}
      },
    }),
  }),
  tagTypes: ["users"],
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetLoginUserQuery,
  useGoogleLoginQuery,
  useLoginWithGoogleQuery,
} = authApi;
