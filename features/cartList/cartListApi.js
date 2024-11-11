import { apiSlice } from "../api/apiSlice";
import { userCartList } from "../auth/authSlice";

export const cartListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCartListProducts: builder.query({
      query: () => ({
        url: `/cart-lists`,
        method: "GET",
      }),
      providesTags: ["cartlists"],
    }),
    addToCartList: builder.mutation({
      query: (data) => ({
        url: `/cart-lists`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cartlists"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.status === "success") {
            const { productId } = arg;
            dispatch(userCartList(productId));
          }
        } catch (err) {}
      },
    }),

    updateCartProductQuantaty: builder.mutation({
      query: (data) => ({
        url: `/cart-lists`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["cartlists"],
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;

      //     if (result.data.status === "success") {
      //       const { productId } = arg;
      //       dispatch(userCartList(productId));
      //     }
      //   } catch (err) {}
      // },
    }),
  }),
});

export const {
  useAddToCartListMutation,
  useGetUserCartListProductsQuery,
  useUpdateCartProductQuantatyMutation,
} = cartListApi;
